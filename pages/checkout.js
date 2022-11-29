import dynamic from 'next/dynamic'
import Layout from "../app/layout";
import ContentHeader from "../app/layout/ContentHeader";

const ModalTest = dynamic(
    () => import('../app/home/ModalTest'),
    { ssr: false }
  )

function Checkout() {
    return (
        <Layout>
            <ContentHeader title="Checkout" />
            
            <div className="my-5 mx-10">
				<ModalTest />
			</div>
        </Layout>
    )
}

export default Checkout