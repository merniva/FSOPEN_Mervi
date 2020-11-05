import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NewBlogForm from "./NewBlogForm";

test("Lomake kutsuu callback-funktiota samoilla tiedoilla joilla blogi luodaan", () => {
  const createBlog = jest.fn();
  const user = { id: "5f900664b6830b07d8726019" };

  const component = render(
    <NewBlogForm
      user={user}
      createBlog={createBlog}
      handleError={() => {}}
      handleNotification={() => {}}
    />
  );

  const blogName = component.container.querySelector("#blogName");
  const blogAuthor = component.container.querySelector("#blogAuthor");
  const blogUrl = component.container.querySelector("#blogUrl");
  const form = component.container.querySelector("form");

  fireEvent.change(blogName, {
    target: { value: "Maanantai on hyvä päivä testaamiseen" },
  });
  fireEvent.change(blogAuthor, {
    target: { value: "Teppo Tetsaa" },
  });
  fireEvent.change(blogUrl, {
    target: { value: "http://teppo.net/maanantai" },
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe(
    "Maanantai on hyvä päivä testaamiseen"
  );
  expect(createBlog.mock.calls[0][0].author).toBe("Teppo Tetsaa");
  expect(createBlog.mock.calls[0][0].url).toBe("http://teppo.net/maanantai");
});
