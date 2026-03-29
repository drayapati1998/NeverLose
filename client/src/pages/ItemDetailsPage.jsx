import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ReviewStep from "../components/item/ReviewStep";
import { useItemDetails } from "../hooks/useItemDetails";
import { AuthContext } from "../context/AuthContext";
import { useDeleteItem } from "../hooks/useDeleteItem";
import { useConfirmDialog } from "../hooks/useConfirmDialog";
import ConfirmDialog from "../components/confirmDialog/ConfirmDialog";
import ItemDetails from "../components/ItemDetails/ItemDetails";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import MainLayout from "../layouts/MainLayout/MainLayout";

export default function ItemDetailsPage() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const { deleteItem, loadingDel, errorDel } = useDeleteItem();
  const confirm = useConfirmDialog();

  const handleDelete = () => {
    confirm.ask(
      "This will permanently delete the item and all associated reports.",
      async () => {
        const result = await deleteItem(id);
        if (result.ok) navigate("/dashboard");
        confirm.close();
      },
    );
  };

  const { item, loading, error } = useItemDetails(id);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <MainLayout username={user?.displayName || "User"}>
      <div className="w-100">
        <div className="mb-4 px-2">
          <h2 className="text-white fw-bold mb-1">Item Details</h2>
          <button
            className="btn btn-link text-white p-0 text-decoration-none d-flex align-items-center"
            onClick={() => navigate(-1)}
          >
            <i className="bi bi-chevron-left me-2"></i>
            Back
          </button>
        </div>
      </div>
      {loading ? (
        <LoadingSpinner message="Fetching data..." />
      ) : (
        <ItemDetails />
      )}
    </MainLayout>
  );
}

//     <div className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition">
//       <div className="flex justify-between items-start">
//         <h3 className="text-lg font-semibold">{item.nickname}</h3>
//         <button
//         onClick={handleDelete}
//         disabled={loading}
//         className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
//       >
//         {loadingDel ? "Deleting..." : "Delete Item"}
//       </button>

//       {errorDel && <p className="text-red-600 mt-2">{errorDel}</p>}

//       <ConfirmDialog
//         open={confirm.open}
//         message={confirm.message}
//         onConfirm={confirm.onConfirm}
//         onCancel={confirm.close}
//       />

//         <ReviewStep form={item} showButtons={false}/>
//         <span
//           className={`px-2 py-1 text-xs rounded ${
//             item.status === "ACTIVE"
//               ? "bg-green-100 text-green-700"
//               : "bg-gray-200 text-gray-600"
//           }`}
//         >
//           {item.status}
//         </span>
//       </div>

//       {item.description && (
//         <p className="text-gray-600 mt-1">{item.description}</p>
//       )}

//       <div className="mt-3 text-sm">
//         <p>
//           <strong>Last Activity:</strong>{" "}
//           {item.lastActivityAt ? item.lastActivityAt : "No activity yet"}
//         </p>

//         <p className="mt-1">
//           <strong>Scan URL:</strong>{" "}
//           <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
//             {item.publicScanUrl}
//           </code>
//         </p>
//       </div>

//       <div className="mt-4 flex gap-3">
//         <button
//           onClick={() => navigate(`/label/${item.id}`, { state: item })}
//           className="px-3 py-2 bg-blue-600 text-white rounded text-sm"
//         >
//           View Label
//         </button>

//         <button
//           onClick={() => navigate(`/items/${item.id}`)}
//           className="px-3 py-2 bg-gray-200 rounded text-sm"
//         >
//           Details
//         </button>
//       </div>
//     </div>
//   );
// }
