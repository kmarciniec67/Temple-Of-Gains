/* eslint-disable react-refresh/only-export-components */
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 10,
  duration: "15s",
  thresholds: {
    http_req_failed: ["rate<0.05"],
    http_req_duration: ["p(95)<800"],
  },
};

export default function () {
  const url = "http://localhost:3000/api/register";

  const payload = JSON.stringify({
    username: `k6_user_${__VU}_${__ITER}`,
    email: `k6_${__VU}_${__ITER}@test.local`,
    password: "Abcd1234!",
  });

  const params = { headers: { "Content-Type": "application/json" } };

  const res = http.post(url, payload, params);

  check(res, {
    "status 201/409": (r) => r.status === 201 || r.status === 409,
  });

  sleep(0.2);
}
