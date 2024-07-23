import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";


const secretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || "";

const stripe = new Stripe(secretKey);

export async function POST(
  req: NextRequest,
  res: {
    setHeader: (arg0: string, arg1: string) => void;
    status: (arg0: number) => {
      (): any;
      new (): any;
      end: { (arg0: string): void; new (): any };
    };
  }
) {
  if (req.method === "POST") {
    try {
      const { cartItems } = await req.json();

      console.log(cartItems);

      if (!cartItems || !Array.isArray(cartItems)) {
        return NextResponse.json(
          { error: "Invalid cartItems format" },
          { status: 400 }
        );
      }

      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1PbrMvRuFvk3dkSPOvJiFpIA" },
          { shipping_rate: "shr_1PbrOKRuFvk3dkSPTHZHCrlP" },
        ],

        line_items: cartItems.map((item: any) => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/bjizggh7/production/"
            )
            .replace("-webp", ".webp");

          return {
            price_data: { 
              currency: 'usd',
              product_data: { 
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled:true,
              minimum: 1,
            },
            quantity: item.quantity
          }
        }),
        success_url: `${req.headers.get("origin")}/success`,
        cancel_url: `${req.headers.get("origin")}/?canceled=true`,
      };

      //creat checkout sessions from body params
      const session = await stripe.checkout.sessions.create(params);

      return NextResponse.json(session);
    } catch (err: any) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode || 500 }
      );
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
