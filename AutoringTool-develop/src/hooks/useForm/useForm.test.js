import { renderHook } from '@testing-library/react'
import {useForm} from './useForm'

describe('pruebas en useForm', () => { 
    const initialStructure={counter:0}
    test('debe tener una estructura vacia cuando no se proporciona una', () => { 
        const {result}=renderHook(()=>useForm());
        const {form}=result.current;
        expect(Object.keys(form).length).toBe(0)
     })

     test('debe estructura igual a la proporcionada', () => { 
        const {result}=renderHook(()=>useForm(initialStructure));
        const {form}=result.current;
        expect(form).toEqual(initialStructure);
     })


     test('debe cambiar el valor del atributo correspondiente', () => { 
        const event={
            target:{
                name:"counter",
                value:2}}

        const {result}=renderHook(()=>useForm(initialStructure));
        const {form,onFormUpdate}=result.current;
        //preguntar
        console.log(form)
        onFormUpdate(event)
        console.log(form)
        // expect(Object.keys(form).length).toBe(1)
    })

 })