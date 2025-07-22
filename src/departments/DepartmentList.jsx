import { Link } from "react-router";

import useQuery from "../api/useQuery.js";

import { departments as test } from "./DepartmentsDummyData.js";

import { useState, useEffect } from "react";

export default function DepartmentList() {
    const { data: departments = test, loading, error } = useQuery("/departments", "departments");
  
    // if (loading || !departments) return <p>Loading...</p>;
    // if (error) return <p>Sorry! {error}</p>;
  
    return (
      <ul>
        {departments.map((department) => (
          <DepartmentListItem key={department.id} department={department} />
        ))}
      </ul>
    );
  }
  
function DepartmentListItem({ department }) {
    return (
        <li>
            <h2><Link to={"/departments/" + department.id}>{department.name}</Link></h2>
        </li>
      );
    }