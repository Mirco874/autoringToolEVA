import { renderHook, waitFor } from "@testing-library/react";
import {useFetch} from "./useFetch"

describe("pruebas en useFetch", () => {

    const validURL="https://api.rawg.io/api/games/13536?key=f4b01c21857b4a8f9a181b0379083f9c";
    const invalidURL="";

    test("el estado inicial de los datos cuando la url es valida debe ser vacio",async () => {
      const {result}= renderHook(()=>useFetch(validURL));
      const {data}=result.current.content;
      expect(Object.keys(data).length).toBe(0);
    });

  test("debe retornar contenido cuando la url es valida",async () => {
    const {result}= renderHook(()=>useFetch(validURL));
    await waitFor(
         ()=>expect(result.current.content.isLoading===false).toBeTruthy(),{timeout:18000} );
        const {current}=result;
        const {data}=current.content;
        expect(Object.keys(data).length).toBeGreaterThan(0);
  });

  test("no debe retornar contenido cuadno la url es invalida",async () => {
    
    const {result}= renderHook(()=>useFetch(invalidURL));

    await waitFor(
         ()=> expect(Object.keys(result.current.content.data).length).toBe(0) );
        const {current}=result;
        const {data}=current.content;
        expect(Object.keys(data).length).toBe(0);
  });

  test("no debe estar cargando cuando termine de cargar el contenido", async() => {
    const {result}= renderHook(()=>useFetch(validURL));
    await waitFor(
         ()=>expect(Object.keys(result.current.content.data).length).toBeGreaterThan(0),{timeout:18000} );
        const {current}=result;
        const {isLoading}=current.content;
        expect(isLoading).toBeFalsy();
  });

  test("no debe tener un error termine de cargar el contenido",async () => {
    const {result}= renderHook(()=>useFetch(validURL));
    await waitFor(
         ()=>expect(Object.keys(result.current.content.data).length).toBeGreaterThan(0),{timeout:18000} );
        const {current}=result;
        const {hasError}=current.content;
        expect(hasError).toBeFalsy();
  });
});
