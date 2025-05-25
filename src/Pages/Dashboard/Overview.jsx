import { useDispatch, useSelector } from "react-redux";
import Charts from "../../components/dashboard/Charts";
import DashboardCards from "../../components/dashboard/DashboardCards";
import { useEffect, useState } from "react";
import { getAuthorReservations } from "../../redux/actions/reservationsActions";
import { removeDuplicates } from "../../hooks/useRemoveDuplicates";

const Overview = () => {
  const dispatch = useDispatch();

  const listingReservations = useSelector(
    (state) => state.reservations.authorReservations
  );

  const [reservations, setReservations] = useState([]);

  // Dispatch reservation fetch
  useEffect(() => {
    dispatch(getAuthorReservations());
  }, [dispatch]);

  // Deduplicate reservation data by checkIn and checkOut
  useEffect(() => {
    const safeReservations = Array.isArray(listingReservations)
      ? listingReservations
      : [];

    const deduped = removeDuplicates(safeReservations, "checkIn", "checkOut");
    setReservations(deduped);
  }, [listingReservations]);

  // Total earnings from all reservations
  const totalPrice = reservations.reduce((acc, reservation) => {
    return acc + (reservation.authorEarnedPrice || 0);
  }, 0);

  return (
    <section className="max-w-[1200px] mx-auto px-4 sm:px-8 md:px-10 xl:px-20 py-8 md:py-12">
      <DashboardCards reservations={reservations} totalPrice={totalPrice} />

      <div className="grid mt-10">
        <div className="bg-white shadow rounded-xl border flex flex-col gap-5 p-7 min-h-[350px]">
          <p className="text-zinc-800 text-base font-semibold">
            Overview of earnings
          </p>
          <Charts reservations={reservations} />
        </div>
      </div>
    </section>
  );
};

export default Overview;
