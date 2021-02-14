import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    const { getByText } = render(<CheckoutForm/>);
    const formHeader = getByText("Checkout Form");
    expect(formHeader).toBeInTheDocument();
});

test("form shows success message on submit with form details", async () => {
    const {getByTestId, getByText, findByTestId} = render(<CheckoutForm/>);

    const user = {
        firstName: 'Test',
        lastName: 'Testington',
        address: '123 Test Rd',
        city: 'Tblisi',
        state: 'Georgia',
        zip: '42020',
    }

    const firstName = getByTestId('firstname');
    const lastName = getByTestId('lastname');
    const address = getByTestId('address');
    const city = getByTestId('city');
    const state = getByTestId('state');
    const zip = getByTestId('zip');
    const submitButton = getByText('Checkout')

    fireEvent.change(firstName, {target:{value: user.firstName}});
    fireEvent.change(lastName, {target:{value: user.lastName}});
    fireEvent.change(address, {target:{value: user.address}});
    fireEvent.change(city, {target:{value: user.city}});
    fireEvent.change(state, {target:{value: user.state}});
    fireEvent.change(zip, {target:{value: user.zip}});
    
    expect(firstName.value).toBe(user.firstName);
    expect(lastName.value).toBe(user.lastName);
    expect(address.value).toBe(user.address);
    expect(city.value).toBe(user.city);
    expect(state.value).toBe(user.state);
    expect(zip.value).toBe(user.zip);

    await act(async () => {
        fireEvent.click(submitButton);
    })
    
     expect((await findByTestId('successMessage')).firstChild)
        .toHaveTextContent('You have ordered some plants! Woo-hoo! 🎉');
});
