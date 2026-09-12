<<<<<<< HEAD
import { useEffect, useState } from "react";

import api from "../api";

export default function Availability() {
  const [availability, setAvailability] = useState([]);

  async function loadAvailability() {
    const response = await api.get("availability/");
    setAvailability(response.data);
  }

  useEffect(() => {
    loadAvailability();
  }, []);

  function updateLocal(id, value) {
    setAvailability((items) =>
      items.map((item) =>
        item.id === id ? { ...item, available_hours: value } : item
      )
    );
  }

  async function save() {
    await Promise.all(
      availability.map((item) =>
        api.patch(`availability/${item.id}/`, {
          available_hours: item.available_hours,
        })
      )
    );

    alert("Availability saved.");
    loadAvailability();
  }

  return (
    <section>
      <div className="page-heading">
        <h1>Weekly availability</h1>
        <p>Tell StudyFlow how much time you can study each day.</p>
      </div>

      <div className="card">
        <div className="availability-list">
          {availability.map((item) => (
            <div className="availability-row" key={item.id}>
              <strong>{item.day_name}</strong>

              <input
                type="number"
                step="0.5"
                min="0"
                max="16"
                value={item.available_hours}
                onChange={(event) =>
                  updateLocal(item.id, event.target.value)
                }
              />

              <span>hours available</span>
            </div>
          ))}
        </div>

        <button onClick={save}>Save availability</button>
      </div>
    </section>
  );
=======
import { useEffect, useState } from "react";

import api from "../api";

export default function Availability() {
  const [availability, setAvailability] = useState([]);

  async function loadAvailability() {
    const response = await api.get("availability/");
    setAvailability(response.data);
  }

  useEffect(() => {
    loadAvailability();
  }, []);

  function updateLocal(id, value) {
    setAvailability((items) =>
      items.map((item) =>
        item.id === id ? { ...item, available_hours: value } : item
      )
    );
  }

  async function save() {
    await Promise.all(
      availability.map((item) =>
        api.patch(`availability/${item.id}/`, {
          available_hours: item.available_hours,
        })
      )
    );

    alert("Availability saved.");
    loadAvailability();
  }

  return (
    <section>
      <div className="page-heading">
        <h1>Weekly availability</h1>
        <p>Tell StudyFlow how much time you can study each day.</p>
      </div>

      <div className="card">
        <div className="availability-list">
          {availability.map((item) => (
            <div className="availability-row" key={item.id}>
              <strong>{item.day_name}</strong>

              <input
                type="number"
                step="0.5"
                min="0"
                max="16"
                value={item.available_hours}
                onChange={(event) =>
                  updateLocal(item.id, event.target.value)
                }
              />

              <span>hours available</span>
            </div>
          ))}
        </div>

        <button onClick={save}>Save availability</button>
      </div>
    </section>
  );
>>>>>>> 6db5b69cab8c264b937baaa36976fd5ad75a9c2b
}