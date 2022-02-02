import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import {
    addToCart,
    removeFromCart,
} from "../slices/cartSlice";
function CheckoutProduct({
    id,
    title,
    price,
    rating,
    description,
    category,
    image,
    hasPrime,
}) {
    const dispatch = useDispatch();
    const addItemToCart = () => {
        const product = {
            id,
            title,
            price,
            description,
            category,
            image,
            rating,
            hasPrime,
        };

        // Sending the product via an action to the redux store (= cart "slice")
        dispatch(addToCart(product));
    }

    function removeItemFromCart() {
        dispatch(removeFromCart({ id }));
    }

    // function removeGroupFromBasket() {
    //     dispatch(removeGroupedFromBasket({ id }));
    // }
    return <div className="block py-4 sm:grid sm:grid-cols-5 my-16 sm:my-3">
        <div className="text-center sm:text-left">
            <Image
                src={image}
                width={200}
                height={200}
                objectFit="contain"
            />
        </div>

        {/* Middle */}
        <div className="col-span-3 mx-5 mb-4 sm:mb-0">
            <p className="my-3">{title}</p>
            <div className="flex">
                {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <StarIcon key={i} className="h-5 text-yellow-500" />
                    ))}
            </div>
            <p className="text-xs my-2 line-clamp-3">{description}</p>
            <Currency quantity={price} currency="GBP" />
            <span className="font-bold">
                {/* <Currency quantity={total} currency="GBP" /> */}
            </span>
            {hasPrime && (
                <div className="flex items-center space-x-2">
                    <img
                        loading="lazy"
                        className="w-12"
                        src="https://links.papareact.com/fdw"
                        alt=""
                    />
                    <p className="text-xs text-gray-500">
                        FREE Next-day Delivery
                    </p>
                </div>
            )}
        </div>

        {/* Buttons on the right of the products */}
        <div className="flex flex-col space-y-2 my-auto justify-self-end">
            <button onClick={addItemToCart} className="button">Add to Cart</button>
            <button onClick={removeItemFromCart} className="button">Remove From Cart</button>
        </div>
    </div>
}
export default CheckoutProduct