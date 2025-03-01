import { createContract } from '../services/contractService';
import { useAuth } from '../context/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/inputStyles.css';

const CreateContract = () => {
  const { user } = useAuth();
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Título é obrigatório'),
    description: Yup.string().required('Descrição é obrigatória'),
    client: Yup.string().required('Cliente é obrigatório'),
    startDate: Yup.date().required('Data de início é obrigatória'),
    endDate: Yup.date().required('Data de término é obrigatória'),
  });

  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    const { title, description, client, startDate, endDate } = values;

    // await createContract({
    //   userId: user?.uid || '',
    //   "title",
    //   description,
    //   client,
    //   startDate,
    //   endDate,
    // });

    toast.success('Contrato criado com sucesso!');
    setSubmitting(false);
    resetForm();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-3/5">
        {' '}
        {/* Aumenta a largura para 3/5 da tela */}
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Cadastro de Contrato
        </h2>
        <Formik
          initialValues={{
            title: '',
            description: '',
            client: '',
            startDate: '',
            endDate: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {' '}
                {/* Grid de 2 colunas */}
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title"
                  >
                    Título
                  </label>
                  <Field
                    type="text"
                    name="title"
                    className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:ring pink-focus-input"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="client"
                  >
                    Cliente
                  </label>
                  <Field
                    type="text"
                    name="client"
                    className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:ring pink-focus-input"
                  />
                  <ErrorMessage
                    name="client"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Descrição
                </label>
                <Field
                  as="textarea"
                  name="description"
                  className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:ring pink-focus-input"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {' '}
                {/* Grid de 2 colunas */}
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="startDate"
                  >
                    Data de Início
                  </label>
                  <Field
                    type="date"
                    name="startDate"
                    className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:ring pink-focus-input"
                  />
                  <ErrorMessage
                    name="startDate"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="endDate"
                  >
                    Data de Término
                  </label>
                  <Field
                    type="date"
                    name="endDate"
                    className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:ring pink-focus-input"
                  />
                  <ErrorMessage
                    name="endDate"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-myPrimary text-white py-2 rounded hover:bg-pink-600 focus:outline-none focus:ring pink-focus-input"
              >
                {isSubmitting ? 'Criando...' : 'Criar Contrato'}
              </button>
            </Form>
          )}
        </Formik>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default CreateContract;
