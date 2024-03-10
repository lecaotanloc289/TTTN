import {
    Card,
    Checkbox,
    Divider,
    FormControlLabel,
    InputBase,
    Stack,
    TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { OrderSummary } from "./OrderSummary";
export function CartCustomerInfo({ data, handleBack, handleComplete }) {
    useEffect(() => {
        window.scrollTo(0, 0);
    });
    return (
        <div className="flex-space-between mg40">
            <Stack spacing={3}>
                <p className="h5 medium dark-title">Add Customer data</p>
                <Stack spacing={1}>
                    <p className="h8 regular dark-title">Full name</p>
                    <TextField
                        fullWidth
                        className="input firstname"
                        variant="outlined"
                        placeholder="Your first name"
                        value={data.name}
                    ></TextField>
                </Stack>
                <Stack spacing={6} direction={"row"}>
                    <Stack spacing={1}>
                        <p className="h8 regular dark-title">Your Email</p>
                        <TextField
                            type="email"
                            placeholder="example@gmail.com"
                            className="input email firstname"
                            variant="outlined"
                            value={data.email}
                        ></TextField>
                    </Stack>
                    <Stack spacing={2} direction={"row"}>
                        <Stack spacing={1}>
                            <p className="h8 regular dark-title">
                                Phone number
                            </p>
                            <Card
                                className="phonenumber input non-box-shadown"
                                component={"form"}
                                sx={{ display: "flex", alignItems: "center" }}
                            >
                                <p
                                    style={{ margin: "0 6px" }}
                                    className="h8 regular prefix-phone"
                                >
                                    +84
                                </p>
                                <Divider
                                    sx={{ height: 28, m: 0.5 }}
                                    orientation="vertical"
                                />
                                <InputBase
                                    placeholder="000 000 000"
                                    className="input-phonenumber firstname"
                                    value={data.phone}
                                />
                            </Card>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack spacing={6} direction={"row"}>
                    <Stack spacing={1}>
                        <p className="h8 regular dark-title">Country</p>
                        <TextField
                            className="input firstname"
                            variant="outlined"
                            placeholder="Viet Nam"
                            value={data.country}
                        ></TextField>
                    </Stack>
                    <Stack spacing={1}>
                        <p className="h8 regular dark-lighter5a">City</p>
                        <TextField
                            className="input city"
                            variant="outlined"
                            placeholder="HCM"
                            value={data.city}
                        ></TextField>
                    </Stack>
                    <Stack spacing={1}>
                        <p className="h8 regular dark-lighter5a">ZIP Code</p>
                        <TextField
                            className="input zip-code"
                            placeholder="123456"
                            variant="outlined"
                            value={data.zip}
                        ></TextField>
                    </Stack>
                </Stack>
                <div>
                    <p className="h8 regular dark-lighter5a">Address details</p>
                    <TextField
                        className="input firstname address"
                        variant="outlined"
                        placeholder="38 C1 Street Tan Binh"
                        value={data.street}
                    ></TextField>
                </div>
                <div>
                    <FormControlLabel
                        className="check-box"
                        control={<Checkbox defaultChecked size="large" />}
                        label="Save this new address in Elma E-commerce"
                    />
                </div>
            </Stack>
            <OrderSummary
                handleBack={handleBack}
                handleComplete={handleComplete}
            />
        </div>
    );
}
