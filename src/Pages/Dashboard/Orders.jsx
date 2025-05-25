import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboardCards from "../../components/dashboard/DashboardCards";
import axios from "axios";
import { API } from "../../backend";

const Orders = () => {
  const user = useSelector((state) => state.user.userDetails);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const res = await axios.get(`${API}reservations/get_author_reservations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data?.data) {
          setReservations(res.data.data);
        }
      } catch (err) {
        console.error("❌ Error fetching orders:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchReservations();
    }
  }, [user]);

  const totalPrice = reservations.reduce(
    (acc, curr) => acc + (curr?.authorEarnedPrice || 0),
    0
  );

  return (
    <section className="max-w-[1200px] mx-auto xl:px-10 py-12">
      <DashboardCards reservations={reservations} totalPrice={totalPrice} />

      <div className="bg-white shadow rounded-xl border flex flex-col gap-5 p-7 mt-8">
        <h2 className="text-xl font-semibold">My Bookings</h2>

        {loading ? (
          <p>Loading...</p>
        ) : reservations.length === 0 ? (
          <p className="text-center text-gray-600">Not a single house booked yet.</p>
        ) : (
          <div className="space-y-4">
            {reservations.map((order, i) => (
              <div key={i} className="border p-4 rounded-md shadow-sm">
                <p>
                  <strong>Listing ID:</strong> {order.listingId}
                </p>
                <p>
                  <strong>Check In:</strong> {order.checkIn}
                </p>
                <p>
                  <strong>Check Out:</strong> {order.checkOut}
                </p>
                <p>
                  <strong>Guests:</strong> {order.guestNumber}
                </p>
                <p>
                  <strong>Total (Base + Tax):</strong> $
                  {order.basePrice + order.taxes}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Orders;
