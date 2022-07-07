import { FiShoppingCart } from "react-icons/fi";
import { useAppSelector } from "../../hooks/useRedux";

const NavCart = () => {
  const { count } = useAppSelector((state) => state.cart);
  return (
    <div className="relative">
      <FiShoppingCart className="h-8 w-8 text-white" />
      <div className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-sm text-white">
        {count}
      </div>
    </div>
  );
};

export default NavCart;
