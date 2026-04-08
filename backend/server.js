import express from "express";
import cors from "cors";
import pkg from "mercadopago";

const { MercadoPagoConfig, Preference } = pkg;

const app = express();

app.use(cors());
app.use(express.json());

// 🔑 CONFIG CLIENTE
const client = new MercadoPagoConfig({
  accessToken: "TU_ACCESS_TOKEN_REAL",
});

// 📌 CREATE PREFERENCE
app.post("/create_preference", async (req, res) => {
  try {
    const preference = {
      items: req.body.items,
      back_urls: {
        success: "http://localhost:3000/success",
        failure: "http://localhost:3000/failure",
        pending: "http://localhost:3000/pending",
      },
      auto_return: "approved",
    };

    const preferenceClient = new Preference(client);
    const result = await preferenceClient.create({ body: preference });

    res.json({ id: result.id });

  } catch (error) {
    console.log("ERROR MP:", error);
    res.status(500).json({ error: "Error creando preferencia" });
  }
});

// 🚀 SERVER
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});