function FieldError({ message }) {
  return message ? <span className="form-error">{message}</span> : null;
}

function InputField({ error, id, label, ...inputProps }) {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <input id={id} aria-invalid={Boolean(error)} {...inputProps} />
      <FieldError message={error} />
    </div>
  );
}

function GuestSelect({ value, onChange }) {
  return (
    <div className="input-group">
      <label htmlFor="guests">Number of Guests</label>
      <select id="guests" name="guests" value={value} onChange={onChange}>
        <option value="1">1 Person</option>
        <option value="2">2 People</option>
        <option value="3">3 People</option>
        <option value="4">4 People</option>
        <option value="5">5 People</option>
        <option value="6">6 People</option>
      </select>
    </div>
  );
}

function OrderField({ error, orderRef }) {
  return (
    <div className="input-group full-width">
      <label htmlFor="order">Your Order</label>
      <textarea
        id="order"
        ref={orderRef}
        rows="4"
        placeholder="2 Lattes, 1 Masala Bun..."
        aria-invalid={Boolean(error)}
      ></textarea>
      <FieldError message={error} />
    </div>
  );
}

export default function BookingFormPresenter({
  mode,
  form,
  errors,
  orderRef,
  onChange,
  onSubmit,
}) {
  const isReserve = mode === 'reserve';

  return (
    <form className="action-form" onSubmit={onSubmit} noValidate>
      <h2>{isReserve ? 'Reserve Your Table' : 'Start Your Order'}</h2>
      <div className="form-grid">
        <InputField
          id="name"
          name="name"
          label="Full Name"
          value={form.name}
          onChange={onChange}
          placeholder="Aarav Mehta"
          error={errors.name}
        />
        <InputField
          id="email"
          name="email"
          label="Email Address"
          type="email"
          value={form.email}
          onChange={onChange}
          placeholder="aarav@example.in"
          error={errors.email}
        />
        {isReserve ? (
          <>
            <InputField
              id="date"
              name="date"
              label="Date"
              type="date"
              value={form.date}
              onChange={onChange}
              error={errors.date}
            />
            <InputField
              id="time"
              name="time"
              label="Time"
              type="time"
              value={form.time}
              onChange={onChange}
              error={errors.time}
            />
            <GuestSelect value={form.guests} onChange={onChange} />
          </>
        ) : (
          <>
            <InputField
              id="time"
              name="time"
              label="Pickup Time"
              type="time"
              value={form.time}
              onChange={onChange}
              error={errors.time}
            />
            <OrderField error={errors.order} orderRef={orderRef} />
          </>
        )}
      </div>
      <button type="submit" className="btn btn-primary submit-btn">
        {isReserve ? 'Confirm Reservation' : 'Place Order'}
      </button>
    </form>
  );
}
