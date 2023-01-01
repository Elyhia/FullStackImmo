import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { Sale } from "../../types/Sale";

interface Props {
  sale?: Sale;
}

interface SaveParams {
  values: Sale;
}

interface DeleteParams {
  id: string;
}

const saveSale = async ({ values }: SaveParams) =>
  await fetch<Sale>(!values["@id"] ? "/sales" : values["@id"], {
    method: !values["@id"] ? "POST" : "PUT",
    body: JSON.stringify(values),
  });

const deleteSale = async (id: string) =>
  await fetch<Sale>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ sale }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<Sale> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveSale(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<Sale> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteSale(id), {
    onSuccess: () => {
      router.push("/sales");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!sale || !sale["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: sale["@id"] });
  };

  return (
    <div className="container mx-auto px-4 max-w-2xl mt-4">
      <Link
        href="/sales"
        className="text-sm text-cyan-500 font-bold hover:text-cyan-700"
      >
        {`< Back to list`}
      </Link>
      <h1 className="text-3xl my-2">
        {sale ? `Edit Sale ${sale["@id"]}` : `Create Sale`}
      </h1>
      <Formik
        initialValues={
          sale
            ? {
                ...sale,
              }
            : new Sale()
        }
        validate={() => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={(values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          saveMutation.mutate(
            { values },
            {
              onSuccess: () => {
                setStatus({
                  isValid: true,
                  msg: `Element ${isCreation ? "created" : "updated"}.`,
                });
                router.push("/sales");
              },
              onError: (error) => {
                setStatus({
                  isValid: false,
                  msg: `${error.message}`,
                });
                if ("fields" in error) {
                  setErrors(error.fields);
                }
              },
              onSettled: () => {
                setSubmitting(false);
              },
            }
          );
        }}
      >
        {({
          values,
          status,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form className="shadow-md p-4" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="sale_price"
              >
                price
              </label>
              <input
                name="price"
                id="sale_price"
                value={values.price ?? ""}
                type="number"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.price && touched.price ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.price && touched.price ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="price"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="sale_area"
              >
                area
              </label>
              <input
                name="area"
                id="sale_area"
                value={values.area ?? ""}
                type="number"
                step="0.1"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.area && touched.area ? "border-red-500" : ""
                }`}
                aria-invalid={errors.area && touched.area ? "true" : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="area"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="sale_region"
              >
                region
              </label>
              <input
                name="region"
                id="sale_region"
                value={values.region ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.region && touched.region ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.region && touched.region ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="region"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="sale_type"
              >
                type
              </label>
              <input
                name="type"
                id="sale_type"
                value={values.type ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.type && touched.type ? "border-red-500" : ""
                }`}
                aria-invalid={errors.type && touched.type ? "true" : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="type"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="sale_date"
              >
                date
              </label>
              <input
                name="date"
                id="sale_date"
                value={values.date?.toLocaleString() ?? ""}
                type="dateTime"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.date && touched.date ? "border-red-500" : ""
                }`}
                aria-invalid={errors.date && touched.date ? "true" : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="date"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="sale_zipCode"
              >
                zipCode
              </label>
              <input
                name="zipCode"
                id="sale_zipCode"
                value={values.zipCode ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.zipCode && touched.zipCode ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.zipCode && touched.zipCode ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="zipCode"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="sale_zip_code"
              >
                zip_code
              </label>
              <input
                name="zip_code"
                id="sale_zip_code"
                value={values.zip_code ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.zip_code && touched.zip_code ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.zip_code && touched.zip_code ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="zip_code"
              />
            </div>
            {status && status.msg && (
              <div
                className={`border px-4 py-3 my-4 rounded ${
                  status.isValid
                    ? "text-cyan-700 border-cyan-500 bg-cyan-200/50"
                    : "text-red-700 border-red-400 bg-red-100"
                }`}
                role="alert"
              >
                {status.msg}
              </div>
            )}
            <button
              type="submit"
              className="inline-block mt-2 bg-cyan-500 hover:bg-cyan-700 text-sm text-white font-bold py-2 px-4 rounded"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
      <div className="flex space-x-2 mt-4 justify-end">
        {sale && (
          <button
            className="inline-block mt-2 border-2 border-red-400 hover:border-red-700 hover:text-red-700 text-sm text-red-400 font-bold py-2 px-4 rounded"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};
