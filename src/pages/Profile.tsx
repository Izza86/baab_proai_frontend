import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '../components/ui/Card/Card';
import Input from '../components/ui/Input/Input';
import Button from '../components/ui/Button/Button';
import useForm, { ValidationRules } from '../hooks/useForm';
import useToast from '../hooks/useToast';
import { UserCheck, Shield, CheckCircle } from 'lucide-react';

interface ProfileFormState {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  bio: string;
}

export const Profile: React.FC = () => {
  const { toast } = useToast();

  const initialValues: ProfileFormState = {
    fullName: 'AI Intern',
    email: 'intern@smartzoneleaders.com',
    password: '',
    confirmPassword: '',
    bio: 'AI Engineer Intern working on frontend design systems and custom form validation engines.',
  };

  const validationRules: ValidationRules<ProfileFormState> = {
    fullName: (value) => {
      if (!value || value.trim().length === 0) {
        return 'Full Name is required';
      }
      if (value.trim().length < 2) {
        return 'Full Name must be at least 2 characters';
      }
      return undefined;
    },
    email: (value) => {
      if (!value) return 'Email Address is required';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address (e.g. user@domain.com)';
      }
      return undefined;
    },
    password: (value) => {
      if (!value) return 'Password is required';
      if (value.length < 8) {
        return 'Password must be at least 8 characters long';
      }
      if (!/[A-Z]/.test(value)) {
        return 'Password must contain at least 1 uppercase letter';
      }
      if (!/\d/.test(value)) {
        return 'Password must contain at least 1 number';
      }
      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
        return 'Password must contain at least 1 special character';
      }
      return undefined;
    },
    confirmPassword: (value, values) => {
      if (!value) return 'Please confirm your password';
      if (value !== values.password) {
        return 'Passwords do not match';
      }
      return undefined;
    },
  };

  const handleFormSubmit = async (values: ProfileFormState) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success(`Profile for "${values.fullName}" successfully updated!`);
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm<ProfileFormState>({
    initialValues,
    validationRules,
    onSubmit: handleFormSubmit,
  });

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700 }}>User Profile & Registration</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
          Phase 4 Interactive Form Validation Engine. Test validation on blur and submit.
        </p>
      </div>

      <Card>
        <CardHeader
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UserCheck size={20} color="var(--color-primary)" />
              <span>Edit Profile Information</span>
            </div>
          }
          subtitle="All fields undergo strict client-side validation rules before submission."
        />
        <form onSubmit={handleSubmit} noValidate>
          <CardBody style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
            {/* Full Name */}
            <Input
              label="Full Name *"
              name="fullName"
              placeholder="e.g. John Doe"
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.fullName ? errors.fullName : undefined}
              helperText="Enter your complete legal first and last name."
            />

            {/* Email Address */}
            <Input
              label="Email Address *"
              name="email"
              type="email"
              placeholder="e.g. user@domain.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email ? errors.email : undefined}
              helperText="Must follow standard email format (^[^\s@]+@[^\s@]+\.[^\s@]+$)"
            />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'var(--spacing-4)',
              }}
            >
              {/* Password */}
              <Input
                label="New Password *"
                name="password"
                type="password"
                placeholder="••••••••"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password ? errors.password : undefined}
                helperText="Min 8 chars, 1 uppercase, 1 number, 1 special character."
              />

              {/* Confirm Password */}
              <Input
                label="Confirm Password *"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirmPassword ? errors.confirmPassword : undefined}
                helperText="Must match Password field exactly."
              />
            </div>

            {/* Bio */}
            <Input
              label="Professional Bio"
              name="bio"
              isTextArea
              rows={3}
              placeholder="Write a brief overview of your role..."
              value={values.bio}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.bio ? errors.bio : undefined}
            />

            {/* Password Validation Requirements Info Box */}
            <div
              style={{
                padding: 'var(--spacing-3) var(--spacing-4)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-muted)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Shield size={14} color="var(--color-primary)" />
                Password Rule Checklist:
              </div>
              <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
                <li>At least 8 characters long</li>
                <li>At least 1 uppercase letter (A-Z)</li>
                <li>At least 1 numeric digit (0-9)</li>
                <li>At least 1 special symbol (!@#$%^&*)</li>
              </ul>
            </div>
          </CardBody>

          <CardFooter>
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
            >
              <CheckCircle size={16} />
              Save Profile Changes
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Profile;
