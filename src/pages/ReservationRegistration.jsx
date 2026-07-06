import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useReservationStore } from "../store/reservationStore";

import "./registration.css";

const NIGHTLY_RATE = 299;

function getNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diff = Math.round((end - start) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

export default function ReservationForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("room");

  const { room, roomType, fetchRoomForBooking, createReservation, error } =
    useReservationStore();

  const [formData, setFormData] = useState({
    guest_name: "",
    guest_email: "",
    guest_phone: "",
    check_in_date: "",
    check_out_date: "",
    room_id: roomId || 1,
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    if (roomId) {
      fetchRoomForBooking(roomId);
    }
  }, [roomId, fetchRoomForBooking]);

  const nights = useMemo(
    () => getNights(formData.check_in_date, formData.check_out_date),
    [formData.check_in_date, formData.check_out_date],
  );

  const dateOrderInvalid =
    formData.check_in_date && formData.check_out_date && nights === 0;

  const nightlyRate = roomType?.price_per_night || NIGHTLY_RATE;
  const total = nights > 0 ? nights * nightlyRate : nightlyRate;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: null }));
    }
    setSubmitted(false);
    if (apiError) setApiError(null);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.guest_name.trim()) {
      errors.guest_name = "Full name is required.";
    }

    if (!formData.guest_email.trim()) {
      errors.guest_email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.guest_email)) {
      errors.guest_email = "Please enter a valid email address.";
    }

    if (!formData.guest_phone.trim()) {
      errors.guest_phone = "Phone number is required.";
    }

    if (!formData.check_in_date) {
      errors.check_in_date = "Check-in date is required.";
    }

    if (!formData.check_out_date) {
      errors.check_out_date = "Check-out date is required.";
    }

    if (dateOrderInvalid) {
      errors.dates = "Check-out must be after check-in.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Run custom validation first
    const isValid = validateForm();
    if (!isValid) return;

    setIsSubmitting(true);
    setApiError(null);

    const payload = {
      ...formData,
      room_id: roomId || formData.room_id,
    };

    const result = await createReservation(payload);

    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      navigate(`/payment?reservation=${result.reservation.reservation_id}`);
    } else {
      setApiError(error || "Failed to book reservation. Please try again.");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <div className="card-form">
          <p className="eyebrow">Book your stay</p>
          <h1 className="heading">Complete your reservation</h1>
          <p className="subheading">
            A few details and the {roomType?.type_name || "Grand Ocean Suite"}{" "}
            is yours.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <fieldset className="field-group">
              <legend>Guest details</legend>

              <label className="field" htmlFor="guest_name">
                <span className="field-label">Full name</span>
                <input
                  type="text"
                  id="guest_name"
                  name="guest_name"
                  autoComplete="name"
                  value={formData.guest_name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  style={{
                    borderColor: validationErrors.guest_name
                      ? "red"
                      : undefined,
                  }}
                />
                {validationErrors.guest_name && (
                  <span
                    style={{
                      color: "red",
                      fontSize: "0.85rem",
                      marginTop: "0.25rem",
                      display: "block",
                    }}
                  >
                    {validationErrors.guest_name}
                  </span>
                )}
              </label>

              <div className="field-row">
                <label className="field" htmlFor="guest_email">
                  <span className="field-label">Email address</span>
                  <input
                    type="email"
                    id="guest_email"
                    name="guest_email"
                    autoComplete="email"
                    value={formData.guest_email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    style={{
                      borderColor: validationErrors.guest_email
                        ? "red"
                        : undefined,
                    }}
                  />
                  {validationErrors.guest_email && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "0.85rem",
                        marginTop: "0.25rem",
                        display: "block",
                      }}
                    >
                      {validationErrors.guest_email}
                    </span>
                  )}
                </label>

                <label className="field" htmlFor="guest_phone">
                  <span className="field-label">Phone number</span>
                  <input
                    type="tel"
                    maxLength="10"
                    id="guest_phone"
                    name="guest_phone"
                    autoComplete="tel"
                    value={formData.guest_phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    style={{
                      borderColor: validationErrors.guest_phone
                        ? "red"
                        : undefined,
                    }}
                  />
                  {validationErrors.guest_phone && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "0.85rem",
                        marginTop: "0.25rem",
                        display: "block",
                      }}
                    >
                      {validationErrors.guest_phone}
                    </span>
                  )}
                </label>
              </div>
            </fieldset>

            <hr className="divider" />

            <fieldset className="field-group">
              <legend>Stay dates</legend>
              <div className="field-row">
                <label className="field" htmlFor="check_in_date">
                  <span className="field-label">Check-in</span>
                  <input
                    type="date"
                    id="check_in_date"
                    name="check_in_date"
                    value={formData.check_in_date}
                    onChange={handleChange}
                    style={{
                      borderColor: validationErrors.check_in_date
                        ? "red"
                        : undefined,
                    }}
                  />
                  {validationErrors.check_in_date && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "0.85rem",
                        marginTop: "0.25rem",
                        display: "block",
                      }}
                    >
                      {validationErrors.check_in_date}
                    </span>
                  )}
                </label>

                <label className="field" htmlFor="check_out_date">
                  <span className="field-label">Check-out</span>
                  <input
                    type="date"
                    id="check_out_date"
                    name="check_out_date"
                    aria-describedby={
                      validationErrors.dates ? "date-error" : undefined
                    }
                    value={formData.check_out_date}
                    onChange={handleChange}
                    style={{
                      borderColor:
                        validationErrors.check_out_date ||
                        validationErrors.dates
                          ? "red"
                          : undefined,
                    }}
                  />
                  {validationErrors.check_out_date &&
                    !validationErrors.dates && (
                      <span
                        style={{
                          color: "red",
                          fontSize: "0.85rem",
                          marginTop: "0.25rem",
                          display: "block",
                        }}
                      >
                        {validationErrors.check_out_date}
                      </span>
                    )}
                </label>
              </div>
              {validationErrors.dates && (
                <p
                  className="field-error"
                  id="date-error"
                  role="alert"
                  style={{ color: "red", marginTop: "0.5rem" }}
                >
                  {validationErrors.dates}
                </p>
              )}
            </fieldset>

            <div className="notice">
              <svg
                className="notice-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p>
                Free cancellation up to 48 hours before check-in. Taxes are
                included in the total shown.
              </p>
            </div>

            {(apiError || error) && (
              <p
                className="field-error"
                style={{
                  marginBottom: "1rem",
                  textAlign: "center",
                  color: "red",
                }}
                role="alert"
              >
                {apiError || error}
              </p>
            )}

            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Booking..." : "Confirm reservation"}
            </button>

            {submitted && (
              <p className="success-message" role="status">
                Reservation details captured — you're all set.
              </p>
            )}
          </form>
        </div>

        <aside className="card-summary" aria-label="Booking summary">
          <div className="summary-top">
            <span className="room-tag">Selected room</span>
            <h2 className="room-name">
              {roomType?.type_name || "Grand Ocean Suite"}
            </h2>
            <p className="room-id">
              Room {room?.room_number || formData.room_id}
            </p>
            <ul className="amenity-list">
              <li>Ocean view</li>
              <li>King size bed</li>
              <li>Free breakfast</li>
            </ul>
          </div>

          <div className="summary-bottom">
            <div className="stay-length">
              <span>{nights > 0 ? nights : "—"}</span>
              <span className="stay-length-label">
                {nights === 1 ? "night" : "nights"}
              </span>
            </div>
            <div className="price">
              <p className="price-label">
                {nights > 0 ? "Total for stay" : "Starting from"}
              </p>
              <p className="price-value">
                ${total.toLocaleString()}
                {nights === 0 && <span className="price-unit">/night</span>}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
