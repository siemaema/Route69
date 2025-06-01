import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUserData } from '../store/features/session/sessionThunk';

export default function UserInfoPage() {
  const user = useSelector((state) => state.session.currentUser);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      postalCode: '',
    },
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        surname: user.surname || '',
        email: user.email || '',
        phone: user.phone || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          postalCode: user.address?.postalCode || '',
        },
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in form.address) {
      setForm((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Imię jest wymagane";
    if (!form.surname.trim()) newErrors.surname = "Nazwisko jest wymagane";
    if (!form.email.trim()) newErrors.email = "Email jest wymagany";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Nieprawidłowy email";

    if (!form.address.street.trim()) newErrors.street = "Ulica jest wymagana";
    if (!form.address.city.trim()) newErrors.city = "Miasto jest wymagane";
    if (!form.address.postalCode.trim()) newErrors.postalCode = "Kod pocztowy jest wymagany";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    dispatch(updateUserData(form));
    toast.success("Zaktualizowano dane użytkownika");
  };

  return (
    <div className="bg-neutral-900 rounded-3xl max-w-3xl mx-auto mt-10 p-8 text-yellow-400">
      <h1 className="text-center text-2xl font-bold mb-6">Twoje Dane</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`bg-zinc-800 rounded-xl p-3 w-full ${errors.name ? 'border border-red-500' : ''}`}
            placeholder="Imię"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="col-span-1">
          <input
            name="surname"
            value={form.surname}
            onChange={handleChange}
            className={`bg-zinc-800 rounded-xl p-3 w-full ${errors.surname ? 'border border-red-500' : ''}`}
            placeholder="Nazwisko"
          />
          {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname}</p>}
        </div>

        <div className="col-span-2">
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`bg-zinc-800 rounded-xl p-3 w-full ${errors.email ? 'border border-red-500' : ''}`}
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="col-span-2">
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="bg-zinc-800 rounded-xl p-3 w-full"
            placeholder="Telefon"
          />
        </div>

        <div className="col-span-2">
          <input
            name="street"
            value={form.address.street}
            onChange={handleChange}
            className={`bg-zinc-800 rounded-xl p-3 w-full ${errors.street ? 'border border-red-500' : ''}`}
            placeholder="Ulica"
          />
          {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
        </div>

        <div className="col-span-1">
          <input
            name="city"
            value={form.address.city}
            onChange={handleChange}
            className={`bg-zinc-800 rounded-xl p-3 w-full ${errors.city ? 'border border-red-500' : ''}`}
            placeholder="Miasto"
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>

        <div className="col-span-1">
          <input
            name="postalCode"
            value={form.address.postalCode}
            onChange={handleChange}
            className={`bg-zinc-800 rounded-xl p-3 w-full ${errors.postalCode ? 'border border-red-500' : ''}`}
            placeholder="Kod pocztowy"
          />
          {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!user}
        className="bg-yellow-400 text-zinc-900 font-bold px-6 py-3 mt-6 rounded-xl hover:bg-yellow-300 w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Zapisz zmiany
      </button>
    </div>
  );
}
