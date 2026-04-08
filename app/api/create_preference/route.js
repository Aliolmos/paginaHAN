import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: "APP_USR-5276495357019633-040808-3ca826a6c07b1b44d0f9f1b44e80d8d0-3323296654",
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { items } = body;

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: items.map(item => ({
          title: item.title,
          unit_price: Number(item.price),
          quantity: Number(item.quantity),
        })),
        back_urls: {
          success: "http://localhost:3000/success",
          failure: "http://localhost:3000/failure",
          pending: "http://localhost:3000/pending",
        },
        auto_return: "approved",
      },
    });

    return Response.json({
      id: response.id,
    });

  } catch (error) {
    console.error(error);
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}