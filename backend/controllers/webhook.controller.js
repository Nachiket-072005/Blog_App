import User from "../models/user.model.js";

export const clerkWebHook = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("WebHook secret needed!");
  }

  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;
  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    res.status(400).json({
      message: "webhook verification failed!",
    });
  }

  console.log(evt.data);

  //   if (evt.type === "user.created") {
  //     const newUser = new User({
  //         clerkUserId: evt.data.id,
  //     });
  //   }
};
