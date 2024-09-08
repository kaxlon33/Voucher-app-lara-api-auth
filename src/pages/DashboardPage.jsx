import React from "react";
import { Container } from "../components/Container";
import ModuleBtn from "../components/ModuleBtn";
import {
  HiCircleStack,
  HiMiniComputerDesktop,
  HiDocumentDuplicate,
} from "react-icons/hi2";

const DashboardPage = () => {
  return (
    <section>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
          <div className="col-span-1">
            <ModuleBtn
              name={"Product Module"}
              icon={<HiCircleStack className="size-14" />}
              url={"/product"}
            />
          </div>
          <div className="col-span-1">
            <ModuleBtn
              name={"Sales Module"}
              icon={<HiMiniComputerDesktop className="size-14" />}
              url={"/sale"}
            />
          </div>
          <div className="col-span-1">
            <ModuleBtn
              name={"Voucher Module"}
              icon={<HiDocumentDuplicate className="size-14" />}
              url={"/voucher"}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DashboardPage;
