import React, { useEffect } from "react";
import logo from "../../assets/logo";
import { Avatar, Button, Container, IconButton, Stack } from "@mui/material";
import icons from "../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_PUBLIC_URL } from "../../utils/config";
import {
    fetchCart,
    handleRemoveProducts,
    saveNote,
    setPaymentMethod,
    setShippingOption,
    updateNote,
} from "../../redux/actions/cartAction";
export default function Review({ handleBack, allStepCompleted, handleNext }) {
    const card = [
        {
            image: logo.Master_Card,
            name: "Credit Card",
            card_number: "**** 7282",
            expired: "8/2027",
        },
    ];
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.userData);
    const products = JSON.parse(localStorage.getItem("selectedProducts"));
    const shipping = useSelector(
        (state) => state.shippingPayment.selectedShippingOption,
    );
    const payment = useSelector(
        (state) => state.shippingPayment.selectedPaymentMethod,
    );

    const note = useSelector((state) => state.notes.note);

    let userId;
    if (userData) userId = userData.id;
    // console.log(userData);
    // console.log(products);
    // console.log(shipping);
    // console.log(payment);
    // console.log(note);

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    // create orderItems
    const orderItems = products.map((item) => ({
        product: item.productId._id,
        quantity: item.quantity,
    }));

    const productIds = orderItems.map((item) => item.product);

    const handleConfirmOrder = async () => {
        const newOrder = {
            orderItems: orderItems,
            shippingAddress1:
                "Học viện Hàng không Việt Nam - 18A/1 phường 4 quận Tân Bình",
            shippingAddress2: userData.street,
            city: userData.city,
            zip: userData.zip,
            country: userData.country,
            phone: userData.phone,
            status: "Pending",
            user: userData.id,
            shipping: shipping,
            payment: payment,
            note: note,
            dateOrdered: Date.now,
        };
        try {
            const res = await axios.post(`${API_PUBLIC_URL}orders`, newOrder);
            const order = res.data;
            // console.log("Order createed: ", order);
            localStorage.setItem("newOrder", order._id);

            // handle remove products in cart
            try {
                const res = await axios.post(
                    `${API_PUBLIC_URL}carts/delete/${userId}`,
                    productIds,
                );
                const updatedProducts = products.filter(
                    (item) =>
                        !productIds.includes(item.productId._id.toHexString()),
                );

                localStorage.setItem(
                    "selectedProducts",
                    JSON.stringify(updatedProducts),
                );
                console.log(res.data);
            } catch (error) {
                console.log("Error remove products from cart: ", error);
            }
            dispatch(fetchCart(userId));

            // handle reload note
            dispatch(updateNote(""));
            dispatch(saveNote(""));

            // handle reload shipping option
            dispatch(setShippingOption(""));
            // handle reload payment method
            dispatch(setPaymentMethod(""));
            window.location.href = "/ordersuccessful";
            return order._id;
        } catch (error) {
            console.error("Error creating order:", error.message);
        }
    };
    // const handleRemoveProduct = async (productId) => {
    //     const product = {
    //         userId: userId,
    //         productId: productId,
    //     };

    //     const updatedProducts = products.filter(
    //         (product) => product.productId._id !== productId,
    //     );

    //     localStorage.setItem(
    //         "selectedProducts",
    //         JSON.stringify(updatedProducts),
    //     );

    //     await dispatch(removeFromCart(product));
    // };
    return (
        <Container>
            {/* Shipping to */}
            <Stack>
                <div className="">
                    <div className="mg20">
                        <p className="h5 medium dark-title">Shipping to...</p>
                        <p className="h8 regular dark-lightest95 mg10">
                            Please check berofe you finalize your order
                        </p>
                    </div>
                </div>
                <div>
                    {userData ? (
                        <Stack spacing={1} direction={"row"}>
                            <Avatar
                                sx={{ width: 56, height: 56 }}
                                // src={}
                            />
                            <Stack spacing={3}>
                                <div className="flex-space-between center">
                                    <div>
                                        <Stack className="flex-row center">
                                            <p
                                                style={{ marginRight: 10 }}
                                                className="h6 medium dark-title"
                                            >
                                                {userData.name}
                                            </p>

                                            <img
                                                height={20}
                                                src={icons.Phone}
                                                alt=""
                                            />
                                            <p className="h8 regular dark-lighter5a">
                                                {userData.phone}
                                            </p>
                                        </Stack>
                                        <div className="flex-row center mg10">
                                            <img
                                                height={20}
                                                src={icons.Home}
                                                alt=""
                                            />
                                            <p
                                                style={{
                                                    margin: "4px 0 0 4px",
                                                }}
                                                className="h8 regular dark-lighter5a"
                                            >
                                                {` ${userData.street} - ${userData.city} - ${userData.country} - ${userData.zip}`}
                                            </p>
                                        </div>
                                    </div>
                                    <IconButton>
                                        <img src={icons.Edit} alt="" />
                                        <p>Edit info</p>
                                    </IconButton>
                                </div>

                                <div>
                                    <Stack
                                        direction={"row"}
                                        spacing={4}
                                        className="center"
                                    >
                                        <Stack direction={"row"}>
                                            <div>
                                                <p className="h6 medium dark-lighter5a">
                                                    {shipping.brand}
                                                </p>
                                                <p className="h8 regular dark-lightest95">
                                                    {shipping.time_express}
                                                </p>
                                            </div>
                                        </Stack>
                                        <Stack direction={"row"} spacing={1}>
                                            <img
                                                height={20}
                                                src={icons.Dollar}
                                                alt=""
                                            />
                                            <p className="h7 medium dark-lighter5a">
                                                Free Shipping
                                            </p>
                                        </Stack>
                                        <img src={shipping.image} alt="" />
                                    </Stack>
                                </div>
                            </Stack>
                        </Stack>
                    ) : (
                        <></>
                    )}
                </div>
            </Stack>

            {/* Payment method */}
            <Stack>
                <div className="">
                    <div className="flex-space-between mg20 center">
                        <p className="h5 medium dark-title">Payment method</p>
                        <Button variant="text">
                            <p className="normal h8 regular indigo mg10">
                                Change method
                            </p>
                        </Button>
                    </div>
                    {card.map((item, index) => (
                        <div className="flex-space-between center">
                            <div className="flex-row center">
                                <img height={50} src={item.image} alt="" />
                                <div>
                                    <div className="flex-row center">
                                        <p className="h6 medium dark-title">
                                            {item.name}
                                        </p>
                                        <p className="h8 regular dark-lighter5a">
                                            {/* {item.phone_number} */}
                                        </p>
                                    </div>
                                    <div className="flex-row center mg10">
                                        <p className="h8 regular dark-lighter5a">
                                            {item.card_number +
                                                "- Expired: " +
                                                item.expired}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <IconButton>
                                <img src={icons.Edit} alt="" />
                                <p>Edit info</p>
                            </IconButton>
                        </div>
                    ))}
                </div>
            </Stack>
            <Stack spacing={2}>
                <Button
                    onClick={() => handleConfirmOrder()}
                    // href="/ordersuccessful"
                    variant="contained"
                    className="button-contained"
                >
                    <img src={icons.Shipping_white} alt="" />
                    <p className="normal h7 medium white">Confirm order</p>
                </Button>
                <Button
                    onClick={handleBack}
                    variant="outlined"
                    className="button-outlined"
                >
                    <img src={icons.Arror_left} alt="" />
                </Button>
            </Stack>
        </Container>
    );
}
