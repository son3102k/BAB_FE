import Layout from "../components/Layout";
import {useEffect} from "react";
import {ProductList} from "../components/UserPurchase/ProductList";
import {Modal} from "../components/UserPurchase/Modal"

export default function UserHomepage() {
    useEffect(() => {
        document.title = "Buy"
    })
    return (
        <Layout page="buy" user={true}
                mainContent={<ProductList/>}>
            <Modal/>
        </Layout>
    );
}