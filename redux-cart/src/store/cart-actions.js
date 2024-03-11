import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";


export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch("https://redux-cart-e0e2e-default-rtdb.firebaseio.com/card.json")
            

            if(!response.ok){
                throw new Error('Could not fetch cart data !')
            }
            const data = await response.json()
            return data;
        }

        try{
           const cartData = await fetchData();
           dispatch(cartActions.replaceCart({
            items:cartData.items || [],
            totalQuantity:cartData.totalQuantity,
           }))
        }catch (error){
            dispatch(
                uiActions.showNotification({
                  status: "error",
                  title: "Error!",
                  message: "Fetching cart data failed!",
                }));
        }

    }
}



export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendReqest = async () => {
      const response = await fetch(
        "https://redux-cart-xxxxx.firebaseio.com/card.json",//You will put your own Firebase Realtime Database URL here.
        {
          method: "PUT",
          body: JSON.stringify({
            items:cart.items,
            totalQuantity:cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendReqest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success...",
          message: "Send cart successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
