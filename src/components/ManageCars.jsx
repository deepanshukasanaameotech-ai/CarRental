// src/pages/ManageCars.jsx
import React, { useEffect, useState } from "react";
import { createCar, getCars, updateCar, deleteCar } from "../api";
import AdminNavbar from "./AdminNavbar";
import { buildImageUrl } from "../utils/imageUtils";

export default function ManageCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  // form state (used for both create and edit)
  const emptyForm = {
    name: "",
    brand: "",
    type: "SUV",
    pricePerDay: "",
    fuelType: "Petrol",
    transmission: "Manual",
    available: true,
  };
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);

  // edit mode
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  async function fetchCars() {
    setLoading(true);
    setError("");
    try {
      const data = await getCars();
      setCars(Array.isArray(data) ? data : data?.cars || []);
    } catch (err) {
      setError(err.message || "Failed to load cars");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  }

  function handleFile(e) {
    setImageFile(e.target.files[0]);
  }

  async function handleCreate(e) {
    e.preventDefault();
    setFormLoading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("brand", form.brand);
      fd.append("type", form.type);
      fd.append("pricePerDay", form.pricePerDay);
      fd.append("fuelType", form.fuelType);
      fd.append("transmission", form.transmission);
      fd.append("available", form.available);
      if (imageFile) fd.append("image", imageFile);

      await createCar(fd); // api handles form-data
      setForm(emptyForm);
      setImageFile(null);
      await fetchCars();
    } catch (err) {
      setError(err.message || "Failed to create car");
    } finally {
      setFormLoading(false);
    }
  }

  function startEdit(car) {
    setEditingId(car._id);
    setForm({
      name: car.name || "",
      brand: car.brand || "",
      type: car.type || "SUV",
      pricePerDay: car.pricePerDay || "",
      fuelType: car.fuelType || "Petrol",
      transmission: car.transmission || "Manual",
      available: car.available === true || car.available === "true",
    });
    setImageFile(null); // editing image not implemented in update flow
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleUpdate(e) {
    e.preventDefault();
    if (!editingId) return;
    setFormLoading(true);
    setError("");
    try {
      // updateCar expects JSON body (image update omitted here)
      await updateCar(editingId, {
        name: form.name,
        brand: form.brand,
        type: form.type,
        pricePerDay: Number(form.pricePerDay),
        fuelType: form.fuelType,
        transmission: form.transmission,
        available: form.available,
      });

      setEditingId(null);
      setForm(emptyForm);
      await fetchCars();
    } catch (err) {
      setError(err.message || "Failed to update car");
    } finally {
      setFormLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this car? This action cannot be undone.")) return;
    try {
      await deleteCar(id);
      setCars((c) => c.filter((x) => x._id !== id));
    } catch (err) {
      alert(err.message || "Delete failed");
    }
  }

  return (
    <div className="pt-6 mt-20 px-6">
        <AdminNavbar />
      <h2 className="text-2xl font-bold mb-4">Manage Cars</h2>

      {/* Create / Edit form */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="font-semibold mb-3">{editingId ? "Edit Car" : "Add New Car"}</h3>

        <form onSubmit={editingId ? handleUpdate : handleCreate} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              name="name"
              placeholder="Name (e.g., Model S)"
              value={form.name}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
            <input
              name="brand"
              placeholder="Brand (e.g., Tesla)"
              value={form.brand}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
            <select name="type" value={form.type} onChange={handleChange} className="p-2 border rounded">
              <option>SUV</option>
              <option>Sedan</option>
              <option>Hatchback</option>
              <option>Luxury</option>
              <option>Electric</option>
            </select>
            <input
              name="pricePerDay"
              placeholder="Price per day"
              value={form.pricePerDay}
              onChange={handleChange}
              type="number"
              required
              className="p-2 border rounded"
            />
            <select name="fuelType" value={form.fuelType} onChange={handleChange} className="p-2 border rounded">
              <option>Petrol</option>
              <option>Diesel</option>
              <option>Electric</option>
              <option>Hybrid</option>
            </select>
            <select name="transmission" value={form.transmission} onChange={handleChange} className="p-2 border rounded">
              <option>Manual</option>
              <option>Automatic</option>
            </select>

            <label className="flex items-center gap-2">
              <input type="checkbox" name="available" checked={!!form.available} onChange={handleChange} />
              <span>Available</span>
            </label>

            <div>
              <label className="block text-sm mb-1">Image (only on create)</label>
              <input type="file" onChange={handleFile} accept="image/*" />
              {editingId && <p className="text-xs text-gray-500 mt-1">To update image, create a new car or modify backend to accept image in PUT.</p>}
            </div>
          </div>

          {error && <div className="text-red-600">{error}</div>}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={formLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {formLoading ? "Saving..." : editingId ? "Update Car" : "Create Car"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                  setImageFile(null);
                }}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Cars list */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-3">All Cars</h3>
        {loading ? (
          <div>Loading cars…</div>
        ) : cars.length === 0 ? (
          <div>No cars found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr>
                  <th className="p-2">Image</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Brand</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Price/day</th>
                  <th className="p-2">Fuel</th>
                  <th className="p-2">Transmission</th>
                  <th className="p-2">Available</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((c) => (
                  <tr key={c._id} className="border-t">
                    <td className="p-2 w-24">
                      {c.image ? (
                        <img
                          src={buildImageUrl(c.image)}
                          alt={c.name}
                          className="h-16 w-full object-cover rounded"
                        />
                      ) : (
                        <div className="h-16 w-24 bg-gray-100 flex items-center justify-center text-xs">
                          No image
                        </div>
                      )}
                    </td>
                    <td className="p-2">{c.name}</td>
                    <td className="p-2">{c.brand}</td>
                    <td className="p-2">{c.type}</td>
                    <td className="p-2">₹{c.pricePerDay}</td>
                    <td className="p-2">{c.fuelType}</td>
                    <td className="p-2">{c.transmission}</td>
                    <td className="p-2">{String(c.available)}</td>
                    <td className="p-2 space-x-2">
                      <button onClick={() => startEdit(c)} className="px-3 py-1 bg-yellow-400 rounded">Edit</button>
                      <button onClick={() => handleDelete(c._id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
