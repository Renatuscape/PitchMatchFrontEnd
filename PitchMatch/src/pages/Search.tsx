import { useState } from "react";
import { SearchBar } from "../components/SearchBar";

export function Search(){
    const [results, setResults]= useState("");
    return<>
    
    <SearchBar />
    
    </>
}