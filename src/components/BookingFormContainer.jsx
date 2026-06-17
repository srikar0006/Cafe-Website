import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/useBooking';
import BookingFormPresenter from './BookingFormPresenter';

const createInitialForm = (mode) => ({
  name: '',
  email: '',
  date: '',
  time: '',
  guests: '2',
  type: mode,
});

const validate = (form, mode, orderValue) => {
  const errors = {};

  if (form.name.trim().length < 2) errors.name = 'Name must be at least 2 characters.';
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Enter a valid email address.';
  if (!form.time) errors.time = mode === 'reserve' ? 'Choose a reservation time.' : 'Choose a pickup time.';
  if (mode === 'reserve' && !form.date) errors.date = 'Choose a reservation date.';
  if (mode === 'pickup' && orderValue.trim().length < 8) {
    errors.order = 'Describe at least one pickup item.';
  }

  return errors;
};

export default function BookingFormContainer({ mode }) {
  const navigate = useNavigate();
  const { saveBooking } = useBooking();
  const orderRef = useRef(null);
  const [form, setForm] = useState(() => createInitialForm(mode));
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const order = orderRef.current?.value || '';
    const nextErrors = validate(form, mode, order);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    saveBooking({
      ...form,
      type: mode,
      order: mode === 'pickup' ? order : '',
      createdAt: new Date().toISOString(),
    });
    navigate('/summary');
  };

  return (
    <BookingFormPresenter
      mode={mode}
      form={form}
      errors={errors}
      orderRef={orderRef}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
