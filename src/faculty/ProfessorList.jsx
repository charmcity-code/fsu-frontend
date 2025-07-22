import { Link } from "react-router";

import useQuery from "../api/useQuery.js";

import { professors as test } from "./ProfessorDummyData.js";

import { useState, useEffect } from "react";

export default function ProfessorList() {
    const {
      data: professors = test,
      loading,
      error,
    } = useQuery("/professors", "professors");
  
    // if (loading || !professors) return <p>Loading...</p>;
    // if (error) return <p>Sorry! {error}</p>;
  
    return (
      <ul>
        {professors.map((professor) => (
          <ProfessorListItem key={professor.id} professor={professor} />
        ))}
      </ul>
    );
  }
  
function ProfessorListItem({ professor }) {
    return (
        <li>
            <h2><Link to={"/professors/" + professor.id}>{professor.name}</Link></h2>
        </li>
      );
    }