import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

const blog = {
  title: "Testitiedostoja käsittelevä blogu",
  author: "Teppo Tetsaa",
  url: "tepontet.net",
  user: "5f900664b6830b07d8726019",
  likes: 2,
};

const loggedUser = blog.user;

test("Näytetään oletussisältö", () => {
  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent(
    "Testitiedostoja käsittelevä blogu"
  );
  expect(component.container).toHaveTextContent("Teppo Tetsaa");
  expect(component.container).not.toHaveTextContent("tepontet.net");
  expect(component.container).not.toHaveTextContent("Tykkäykset");
});

test("Näytä-napin klikkauksen jälkeen näytetään laajennettu sisältö", () => {
  const component = render(<Blog blog={blog} loggedUser={loggedUser} />);

  expect(component.container).toHaveTextContent(
    "Testitiedostoja käsittelevä blogu"
  );
  expect(component.container).toHaveTextContent("Teppo Tetsaa");
  expect(component.container).not.toHaveTextContent("tepontet.net");
  expect(component.container).not.toHaveTextContent("Tykkäykset");

  const button = component.getByText("Näytä tiedot");
  fireEvent.click(button);
  expect(component.container).toHaveTextContent("tepontet.net");
  const element = component.getByText("Tykkäykset");
  expect(element).toBeDefined();
});

test("Piilota-napin klikkauksen jälkeen näytetään oletussisältö", () => {
  const component = render(<Blog blog={blog} loggedUser={loggedUser} />);

  expect(component.container).toHaveTextContent(
    "Testitiedostoja käsittelevä blogu"
  );
  expect(component.container).toHaveTextContent("Teppo Tetsaa");
  expect(component.container).not.toHaveTextContent("tepontet.net");
  expect(component.container).not.toHaveTextContent("Tykkäykset");

  const showButton = component.getByText("Näytä tiedot");
  fireEvent.click(showButton);
  expect(component.container).toHaveTextContent("tepontet.net");
  const element = component.getByText("Tykkäykset");
  expect(element).toBeDefined();

  const hideButton = component.getByText("Piilota tiedot");
  fireEvent.click(hideButton);
  expect(component.container).toHaveTextContent(
    "Testitiedostoja käsittelevä blogu"
  );
  expect(component.container).toHaveTextContent("Teppo Tetsaa");
  expect(component.container).not.toHaveTextContent("tepontet.net");
  expect(component.container).not.toHaveTextContent("Tykkäykset");
});

test("Tykkää-napin painaminen kahdesti tuottaa kaksi funktiokutsua", () => {
  const addNewLike = jest.fn();
  const component = render(
    <Blog blog={blog} loggedUser={loggedUser} addNewLike={addNewLike} />
  );

  expect(component.container).toHaveTextContent(
    "Testitiedostoja käsittelevä blogu"
  );
  const showButton = component.getByText("Näytä tiedot");
  fireEvent.click(showButton);
  const likeButton = component.getByText("Tykkää");
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);
  expect(addNewLike).toHaveBeenCalledTimes(2);
  // OR: expect(addNewLike.mock.calls).toHaveLength(2);
});
