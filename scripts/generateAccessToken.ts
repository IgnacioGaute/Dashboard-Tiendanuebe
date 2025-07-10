import axios from "axios";

(async () => {
  try {
    const res = await axios.post("https://www.tiendanube.com/apps/authorize/token", {
      client_id: "19325",
      client_secret: "ba3e29ea526593b84e370eca9a8cc97ddc242b154a891c6f",
      grant_type: "authorization_code",
      code: "c533ca1dac464f71dde1d5ff4b05f559755b0105",
    });
    console.log("Access Token:", res.data.access_token);
    console.log("Store ID:", res.data.user_id);
  } catch (err: any) {
    console.error("❌ Error:", err.response?.data || err.message);
  }
})();