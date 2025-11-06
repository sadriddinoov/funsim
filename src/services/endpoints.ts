const endpoints = {
  faqs: "public/faqs",
  plans: "public/plans",
  regions: "public/regions",
  orderCreate: "public/order-simcard/create",
  payment: "public/payments",
  login: "public/client/login-sms",
  checkBalance: (id: any) => `client/order-simcard/balance/${id}`,
  simOrder: "client/order-simcard/my-orders",
  profile: "client/me",
  auth: "client/secret-login",
  regionGroups: "public/region-groups",
};

export default endpoints;
