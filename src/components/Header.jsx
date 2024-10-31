import React from "react";
import Container from "./Container";
import useCookie from "react-use-cookie";

const Header = () => {
  const [userCookie] = useCookie("user");
  console.log(userCookie);

  const { name, email, profile_image ,password } = JSON.parse(userCookie);
  // console.log(userObj);

  return (
    <header className="mb-5 ">
      <Container>
        <div className="flex justify-between">
          <div className="">
            <h1 className="text-3xl font-bold">Voucher App</h1>
            <p className="text-stone-500">MMS Software</p>
          </div>

          <div className="flex gap-3 items-center">
            <img
              src={
                profile_image
                  ? profile_image
                  : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              }
              alt="user photo"
              className="border-2 border-white rounded-full size-12 object-cover object-top"
            />
            <div className="">
              <h1 className="text-3xl font-bold">{name}</h1>
              <p className="text-stone-500">{email}</p>
              <p className="text-stone-500">{password}</p>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
