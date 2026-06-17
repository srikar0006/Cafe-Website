import { Navigate, useParams } from 'react-router-dom';
import BookingFormContainer from '../components/BookingFormContainer';

export default function BookingPage() {
  const { mode = 'reserve' } = useParams();

  if (mode !== 'reserve') {
    return <Navigate to="/booking/reserve" replace />;
  }

  return <BookingFormContainer key={mode} mode={mode} />;
}
