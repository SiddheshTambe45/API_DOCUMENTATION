import React from "react";
import { FormData } from "@/app/(root)/create-new-api/page";

// Define the type for Preview component props
interface PreviewProps {
  data: FormData;
}

// const dummyValues: FormData = {
//   url: "https://api.example.com/v1/users",
//   title: "User Management API",
//   description: `
//       The User Management API allows you to manage user accounts by providing endpoints to create, retrieve, update, and delete users.
//       It supports filtering, sorting, and pagination for the list of users.
//       Authentication is required for all requests.
//     `,
//   method: "GET",
//   reqParams: {
//     page: "integer (default: 1)",
//     limit: "integer (default: 10)",
//     sort: "string (optional, values: 'name', 'created_at')",
//   },
//   resBody: {
//     status: 200,
//     data: [
//       {
//         id: "1",
//         name: "John Doe",
//         email: "johndoe@example.com",
//         role: "admin",
//         created_at: "2022-01-15T10:00:00Z",
//       },
//       {
//         id: "2",
//         name: "Jane Smith",
//         email: "janesmith@example.com",
//         role: "user",
//         created_at: "2022-02-20T14:30:00Z",
//       },
//       {
//         id: "1",
//         name: "John Doe",
//         email: "johndoe@example.com",
//         role: "admin",
//         created_at: "2022-01-15T10:00:00Z",
//       },
//       {
//         id: "2",
//         name: "Jane Smith",
//         email: "janesmith@example.com",
//         role: "user",
//         created_at: "2022-02-20T14:30:00Z",
//       },
//     ],
//   },
//   reqBody: {
//     id: "2",
//     name: "Jane Smith",
//     email: "janesmith@example.com",
//     role: "user",
//     created_at: "2022-02-20T14:30:00Z",
//     object: [
//       {
//         id: "1",
//         name: "John Doe",
//         email: "johndoe@example.com",
//         role: "admin",
//         created_at: "2022-01-15T10:00:00Z",
//       },
//       {
//         id: "2",
//         name: "Jane Smith",
//         email: "janesmith@example.com",
//         role: "user",
//         created_at: "2022-02-20T14:30:00Z",
//       },
//     ],
//   },
// };

const Preview = ({ data }: PreviewProps) => {
  if (!data) {
    return <div>No API data available</div>;
  }

  return (
    <div
      className="p-4 flex justify-start items-start flex-col"
      id="previewContent"
    >
      <div className="flex flex-col items-start justify-start">
        <p className="font-semibold">URL:</p>

        <p>
          <code>{data.url}</code>
        </p>
      </div>
      <br />

      <div className="flex flex-col items-start justify-start">
        <p className="font-semibold">Method:</p>

        <p>
          <code>{data.method}</code>
        </p>
      </div>
      <br />

      <div className="flex flex-col items-start justify-start">
        <p className="font-semibold">Title:</p>

        <p>
          <code>{data.title}</code>
        </p>
      </div>
      <br />

      <div className="flex flex-col items-start justify-start">
        <p className="font-semibold">Description:</p>

        <p>
          <code>{data.description}</code>
        </p>
      </div>
      <br />

      {/* Displaying Request Parameters */}
      {data.reqParams && (
        <div className="flex flex-col items-start justify-start">
          <p className="font-semibold">Request Params:</p>
          <div>
            {Object.entries(data.reqParams).map(([key, value]) => (
              <div key={key}>
                <p>
                  <code>
                    {key}: <span>{value}</span>
                  </code>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      <br />

      {/* Displaying Request Body */}
      {data.reqBody && (
        <div className="flex flex-col items-start justify-start">
          <p className="font-semibold">Request Body:</p>

          <pre className="">{JSON.stringify(data.reqBody, null, 2)}</pre>
        </div>
      )}
      <br />

      {/* Displaying Response Body */}
      {data.resBody && (
        <div className="flex flex-col items-start justify-start">
          <p className="font-semibold">Response Body:</p>

          <pre className="">{JSON.stringify(data.resBody, null, 2)}</pre>
        </div>
      )}
      <br />
    </div>
  );
};

export default Preview;
