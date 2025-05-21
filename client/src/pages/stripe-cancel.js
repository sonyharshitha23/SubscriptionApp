import React, { useState, useEffect } from "react";
import axios from "axios";
import { SyncOutlined } from "@ant-design/icons";
const StripeSuccess = () => {
  return (
    <div>
      <div>
        <SyncOutlined spin style={{ fontSize: "50px" }} />
      </div>
    </div>
  );
};
export default StripeSuccess;
