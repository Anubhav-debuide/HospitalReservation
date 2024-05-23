import { render, screen ,waitFor, fireEvent} from '@testing-library/react';
import {act} from "react"
import App from './App';
import axios from "axios"

jest.mock("axios")

describe("Hospital Reservations Tests", ()=>{

  afterEach(() => {
    jest.restoreAllMocks(); 
  });


test('renders component with initial state', () => {
  render(<App />);

  expect(screen.getByText('Hospital Reservation System')).toBeInTheDocument();

  expect(screen.getByDisplayValue('Select Room Type')).toBeInTheDocument();

  expect(screen.getByText('Reserve')).toBeInTheDocument();
});

test("Check if a button exists with text Reserve", ()=>{
    render(<App/>)

    let reserveButton  = screen.getByRole("button", { name: "Reserve" });
    expect(reserveButton).toBeInTheDocument();
})


test('renders select tag with three options', () => {
  render(<App />);

  const selectElement = screen.getByRole('combobox'); 
  expect(selectElement).toBeInTheDocument(); 

  const options = screen.getAllByRole('option'); 
  expect(options).toHaveLength(4); 

  expect(screen.getByText('Select Room Type')).toBeInTheDocument();
  expect(screen.getByText('Normal Room')).toBeInTheDocument();
  expect(screen.getByText('Oxygen Room')).toBeInTheDocument();
  expect(screen.getByText('ICU')).toBeInTheDocument();
});


test('makes reservation when room type is selected', async () => {
  const mockResponse = { data: { message: 'Reservation successful' } };
  axios.post.mockResolvedValueOnce(mockResponse);

  render(<App />);
  await act(async()=>{
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Normal Room' } });
    fireEvent.click(screen.getByText('Reserve'));
  })
 

  await waitFor(() => {
    expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/v1/makeReservation', { roomType: 'Normal Room' });
    // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
    expect(screen.getByText('Reservation successful')).toBeInTheDocument();
  });
});



test('Fetches available rooms on mount', async () => {
 
  const mockData = {
    "availableNormal": 50,
    "availableIcu": 16,
    "availableOxygen": 50
}
jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockData });

  act(()=>{
    render(<App />);
  })

  await waitFor(() => {
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  //waiting for states to update
  await waitFor(()=>{
    expect(screen.getByText('ICU : 16')).toBeInTheDocument();
  })
  expect(screen.getByText('Normal Rooms : 50')).toBeInTheDocument();
  expect(screen.getByText('Oxygen Rooms : 50')).toBeInTheDocument();
  expect(screen.getByText('ICU : 16')).toBeInTheDocument();
  // expect(screen.getByText(text => text.includes('Oxygen Room : 50'))).toBeInTheDocument();

});

})


