import { useState, useCallback, ChangeEvent, FocusEvent, FormEvent } from 'react';

export type ValidationRules<T> = {
  [K in keyof T]?: (value: T[K], values: T) => string | undefined;
};

export interface UseFormOptions<T> {
  initialValues: T;
  validationRules?: ValidationRules<T>;
  onSubmit: (values: T) => void | Promise<void>;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validationRules = {},
  onSubmit,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback(
    (name: keyof T, value: any, currentValues: T): string | undefined => {
      const rule = validationRules[name];
      if (rule) {
        return rule(value, currentValues);
      }
      return undefined;
    },
    [validationRules]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      const fieldName = name as keyof T;

      setValues((prev) => {
        const nextValues = { ...prev, [fieldName]: value };
        // If field was already touched, revalidate on change
        if (touched[fieldName]) {
          const error = validateField(fieldName, value, nextValues);
          setErrors((prevErr) => ({
            ...prevErr,
            [fieldName]: error,
          }));
        }
        return nextValues;
      });
    },
    [touched, validateField]
  );

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      const fieldName = name as keyof T;

      setTouched((prev) => ({ ...prev, [fieldName]: true }));
      const error = validateField(fieldName, value, values);
      setErrors((prev) => ({
        ...prev,
        [fieldName]: error,
      }));
    },
    [validateField, values]
  );

  const validateAll = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    (Object.keys(values) as (keyof T)[]).forEach((field) => {
      const error = validateField(field, values[field], values);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [validateField, values]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Touch all fields on submit
    const allTouched: Partial<Record<keyof T, boolean>> = {};
    (Object.keys(values) as (keyof T)[]).forEach((field) => {
      allTouched[field] = true;
    });
    setTouched(allTouched);

    const isValid = validateAll();
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues,
  };
}

export default useForm;
