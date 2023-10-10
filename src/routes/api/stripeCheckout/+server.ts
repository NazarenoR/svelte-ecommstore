import type { RequestHandler } from "./Stypes";
import Stripe from 'stripe';

const SECRET_STRIPE_KEY = "sk_test_51NyMrdDs1fvwFoNodkG7i3p5LKOmJD9kFUqkRajSgodWgFQqiLpmIl83gm5fsIyfHPelfoiNmivmfUwvLL8n1tZz007GBEWoQZ";
const stripe = new Stripe(SECRET_STRIPE_KEY, {
    apiVersion: "2023-08-16"
});

//localhost:5173/api/stripeCheckout

export const POST: RequestHandler = async ({request}) => {

    const data = await request.json();
    const items = data.items;

    let lineItems : any = [];
    items.forEach((item: any) => {
        lineItems.push({
            price: item.id,
            quantity: item.quantity
        });
    });

    const session = await stripe.checkout.sessions.create({
        
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/cancel",
    });

    return new Response(
        JSON.stringify({ url: session.url}), 
        {
            status: 200,
            headers: {
                "content-Type": "application/json"
            }
        }
    )

}