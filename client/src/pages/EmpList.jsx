
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/axios";
import toast from "react-hot-toast";
import { Container } from "react-bootstrap";
import {Table,Button} from "react-bootstrap";

function EmpList() {
  const [emps, setEmps] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [status,setStatus]=useState("all");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });

  const navigate = useNavigate();
  const axios = useApi();

  const fetchemployees = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get("/employees", {
        params: { search, department,status, page, limit: 10 },
      });
      setEmps(data.employees);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  }, [search, department,status, page]);

  useEffect(() => {
    fetchemployees();
  }, [fetchemployees]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handledeptFilter = (e) => {
    setDepartment(e.target.value);

    setPage(1);
  };
    const handlestatusFilter = (e) => {
    setStatus(e.target.value);

    setPage(1);
  };
  const handleEdit=(id)=>{
    navigate(`/editemp/${id}`);
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    try {
      const { data } = await axios.delete(`/employees/${id}`);
      if (data.success) {toast.success("Employee deleted");
      setEmps((prev) => prev.filter((t) => t._id !== id));
      setPagination((prev) => ({ ...prev, total: prev.total - 1 }));}
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete employee.");
    }
  };

  

  return (
    <>
      <style>{`
        .tl-wrap {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          padding: 2.5rem 1rem 5rem;
          max-width: 680px;
          margin: 0 auto;
        }

        /* Header */
        .tl-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .tl-header h2 {
          font-family: 'Syne', sans-serif;
          font-size: 1.6rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }
        .tl-btn-add {
          background: #0f172a;
          color: #fff;
          border: none;
          border-radius: 0.75rem;
          padding: 0.5rem 1.1rem;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .tl-btn-add:hover { background: #6366f1; }

        /* Controls */
        .tl-controls {
          display: flex;
          gap: 0.625rem;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }
        .tl-search-wrap {
          position: relative;
          flex: 1;
          min-width: 160px;
        }
        .tl-search-icon {
          position: absolute;
          left: 0.7rem;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          font-size: 0.8rem;
          pointer-events: none;
        }
        .tl-search {
          width: 100%;
          padding: 0.5rem 0.875rem 0.5rem 2rem;
          border: 1.5px solid #e2e8f0;
          border-radius: 0.6rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          color: #0f172a;
          outline: none;
          transition: border-color 0.15s;
          background: #fff;
        }
        .tl-search:focus { border-color: #6366f1; }
        .tl-search::placeholder { color: #94a3b8; }
        .tl-select {
          padding: 0.5rem 0.875rem;
          border: 1.5px solid #e2e8f0;
          border-radius: 0.6rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          color: #0f172a;
          outline: none;
          cursor: pointer;
          background: #fff;
          transition: border-color 0.15s;
        }
        .tl-select:focus { border-color: #6366f1; }

        /* Count */
        .tl-count {
          font-size: 0.8rem;
          color: #94a3b8;
          margin-bottom: 0.875rem;
        }
        .tl-count span { color: #6366f1; font-weight: 700; }

        /* Task list */
        .tl-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          animation: tlFadeUp 0.4s ease both;
        }
        @keyframes tlFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Task item */
        .tl-item {
          display: flex;
          align-items: flex-start;
          gap: 0.875rem;
          background: #fff;
          border: 1.5px solid #e2e8f0;
          border-radius: 0.875rem;
          padding: 0.875rem 1rem;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .tl-item:hover {
          border-color: #c7d2fe;
          box-shadow: 0 2px 12px rgba(99,102,241,0.07);
        }
        .tl-item.completed {
          background: #fafafa;
          border-color: #f1f5f9;
        }

        /* Checkbox */
        .tl-checkbox {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #cbd5e1;
          flex-shrink: 0;
          cursor: pointer;
          margin-top: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.15s, background 0.15s;
          background: #fff;
        }
        .tl-checkbox:hover { border-color: #6366f1; }
        .tl-checkbox.checked {
          background: #6366f1;
          border-color: #6366f1;
          color: #fff;
          font-size: 0.65rem;
        }

        /* Content */
        .tl-content { flex: 1; min-width: 0; }
        .tl-title {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 0.125rem;
        }
        .tl-title.done {
          text-decoration: line-through;
          color: #94a3b8;
        }
        .tl-desc {
          font-size: 0.8rem;
          color: #94a3b8;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: 0.375rem;
        }
        .tl-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .tl-badge {
          display: inline-block;
          padding: 0.125rem 0.5rem;
          border-radius: 999px;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .tl-badge-completed { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
        .tl-badge-pending   { background: #fef3c7; color: #92400e; border: 1px solid #fde68a; }
        .tl-date { font-size: 0.75rem; color: #cbd5e1; }

        /* Actions */
        .tl-actions {
          display: flex;
          gap: 0.3rem;
          flex-shrink: 0;
          align-items: center;
        }
        .tl-btn {
          padding: 0.25rem 0.6rem;
          border-radius: 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.15s;
        }
        .tl-btn-edit   { background: #eff6ff; color: #3b82f6; border-color: #bfdbfe; }
        .tl-btn-edit:hover   { background: #3b82f6; color: #fff; }
        .tl-btn-delete { background: #fef2f2; color: #dc2626; border-color: #fecaca; }
        .tl-btn-delete:hover { background: #dc2626; color: #fff; }

        /* States */
        .tl-empty {
          text-align: center;
          padding: 3rem 1rem;
          color: #94a3b8;
        }
        .tl-empty-icon { font-size: 2rem; margin-bottom: 0.5rem; }
        .tl-empty-title { font-size: 0.9rem; font-weight: 600; color: #64748b; }
        .tl-empty-sub   { font-size: 0.8rem; margin-top: 0.25rem; }

        .tl-loading {
          text-align: center;
          padding: 3rem;
          color: #94a3b8;
          font-size: 0.875rem;
        }

        .tl-error {
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }

        /* Pagination */
        .tl-pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1.5rem;
        }
        .tl-page-btn {
          padding: 0.4rem 1rem;
          border-radius: 0.6rem;
          font-size: 0.8rem;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          border: 1.5px solid #e2e8f0;
          background: #fff;
          color: #334155;
          transition: all 0.15s;
        }
        .tl-page-btn:hover:not(:disabled) { background: #0f172a; color: #fff; border-color: #0f172a; }
        .tl-page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .tl-page-info { font-size: 0.82rem; color: #94a3b8; padding: 0 0.25rem; }

        @media (max-width: 480px) {
          .tl-desc { display: none; }
          .tl-btn span { display: none; }
        }
      `}</style>

      <Container>
        <div className="tl-wrap">

          {/* Header */}
          <div className="tl-header">
            <h2>Employees list</h2>
            <button className="tl-btn-add" onClick={() => navigate("/addemp")}>
              + New Employee
            </button>
          </div>

          {/* Error */}
          {error && <div className="tl-error">⚠ {error}</div>}

          {/* Controls */}
          <div className="tl-controls">
            <div className="tl-search-wrap">
              <span className="tl-search-icon">🔍</span>
              <input
                type="text"
                className="tl-search"
                placeholder="Search employee..."
                value={search}
                onChange={handleSearch}
              />
            </div>
            <select className="tl-select" value={department} onChange={handledeptFilter}>
              <option value="">All</option>
              <option value="hr">HR</option>
              <option value="finance">Finance</option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
              <option value="it">IT</option>

            </select>
            <select className="tl-select" value={status} onChange={handlestatusFilter}>
              <option value="">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>

            </select>
          </div>

          {/* Count */}
          <p className="tl-count">
            <span>{pagination.total}</span> employee{pagination.total !== 1 ? "s" : ""}
          </p>

          {/* List */}
          {loading ? (
            <div className="tl-loading">Loading employees...</div>
          ) : emps.length === 0 ? (
            <div className="tl-empty">
              <div className="tl-empty-icon">📋</div>
              <div className="tl-empty-title">
                {search=="" && department=="all" && status == "all" ? "No employees added yet" : "No matching employees"}
              </div>
              <div className="tl-empty-sub">
                {search=="" && department=="all" && status == "all"
                  ?'Click "+ New employee" to get started.'
                  :  "Try adjusting your filters."}
              </div>
            </div>
          ) : (
        <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Department</th>
           <th>Designation</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {emps.length > 0 ? (
            emps.map((emp) => (
              <tr key={emp._id} className="align-middle">
               <td>{emp.employeeId}</td>
        <td >{emp.fullName}</td>  {/* populated field */}
        <td >{emp.department}</td>   
        <td >{emp.designation}</td>
        <td >{emp.status}</td>
               
                <td>
                  
                  <Button 
                    variant="outline-success" 
                    size="sm" 
                    onClick={() => handleEdit(emp._id)}
                  >
                    Edit
                  </Button>
                   <Button 
                    variant="outline-danger" 
                    size="sm" 
                    onClick={() => handleDelete(emp._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No Employees available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
            
          )}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="tl-pagination">
              <button
                className="tl-page-btn"
                onClick={() => setPage((p) => p - 1)}
                disabled={page <= 1}
              >
                ← Prev
              </button>
              <span className="tl-page-info">
                Page {page} of {pagination.pages}
              </span>
              <button
                className="tl-page-btn"
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= pagination.pages}
              >
                Next →
              </button>
            </div>
          )}

        </div>
      </Container>
    </>
  );
}

export default EmpList;