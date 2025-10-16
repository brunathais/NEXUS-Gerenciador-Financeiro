// confirmação simples

export function useConfirm(){
    function confirm(texto: string){
        return window.confirm(texto);
    }
    return {confirm};
}