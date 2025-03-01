import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/inputStyles.css';
import { createCustomer } from '../../services/customerService';
import { useAuth } from '../../context/AuthContext';
import { MyRGInput } from '../../components/inputs/InputRG';
import { MyCelphoneInput } from '../../components/inputs/InputCelphone';
import { MyCPFInput } from '../../components/inputs/InputCPF';

const CustomerRegistration = () => {
  const { user } = useAuth();

  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  //const rgRegex = /^[0-9]{1,2}.?[0-9]{3}.?[0-9]{3}-?[0-9Xx]{1}$/;
  //const celphoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Nome completo é obrigatório'),
    dateBirth: Yup.date().required('Data de nascimento é obrigatória'),
    rg: Yup.string().required('RG é obrigatório'),
    cpf: Yup.string()
      .required('CPF é obrigatório')
      .matches(cpfRegex, 'CPF inválido'),
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    celphone: Yup.string().required('Celular é obrigatório'),
    note: Yup.string(),
  });

  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      const { fullName, dateBirth, rg, cpf, email, celphone, note } = values;

      await createCustomer({
        userId: user?.uid || '',
        fullName,
        dateBirth,
        rg,
        cpf,
        email,
        celphone,
        note,
      });

      toast.success('Cliente cadastrado com sucesso!');
      resetForm();
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      toast.error('Erro ao cadastrar cliente. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-3/5">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Cadastro de Cliente
        </h2>
        <Formik
          initialValues={{
            fullName: '',
            dateBirth: '',
            rg: '',
            cpf: '',
            email: '',
            celphone: '',
            note: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="fullName"
                  >
                    Nome Completo
                  </label>
                  <Field
                    type="text"
                    name="fullName"
                    className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:ring pink-focus-input"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="dateBirth"
                  >
                    Data de Nascimento
                  </label>
                  <Field
                    type="date"
                    name="dateBirth"
                    className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:ring pink-focus-input"
                  />
                  <ErrorMessage
                    name="dateBirth"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="rg"
                  >
                    RG
                  </label>
                  <Field name="rg" component={MyRGInput} />
                  <ErrorMessage
                    name="rg"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="cpf"
                  >
                    CPF
                  </label>
                  <Field name="cpf" component={MyCPFInput} />
                  <ErrorMessage
                    name="cpf"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:ring pink-focus-input"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="celphone"
                  >
                    Celular
                  </label>
                  <Field name="celphone" component={MyCelphoneInput} />
                  <ErrorMessage
                    name="celphone"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="note"
                >
                  Observações
                </label>
                <Field
                  as="textarea"
                  name="note"
                  className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:ring pink-focus-input"
                />
                <ErrorMessage
                  name="note"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-myPrimary text-white py-2 rounded hover:bg-pink-600 focus:outline-none focus:ring pink-focus-input"
              >
                {isSubmitting ? 'Cadastrando...' : 'Cadastrar Cliente'}
              </button>
            </Form>
          )}
        </Formik>
        <ToastContainer position="top-right" autoClose={1500} />
      </div>
    </div>
  );
};

export default CustomerRegistration;
