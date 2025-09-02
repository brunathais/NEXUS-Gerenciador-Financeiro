import React from 'react';

export default function Metas() {
    return (
        <>
            <h1>Gerenciador de Metas financeiras!</h1>
            <p>Aqui você pode definir, acompanhar e alcançar suas metas financeiras de forma eficaz!</p>

            <form id="form-metas">
             <label htmlFor="nomeMeta">Nome da Meta</label>
             <input type="text" id="nomeMeta" required />

                <label htmlFor="valorInicial">Valor Inicial</label>
                <input type="number" id="valorInicial" required />

                <label htmlFor="valorTotal">Valor Total</label>
                <input type="number" id="valorTotal" required />

                <button type="submit">Adicionar Meta</button>
            <div id="lista-metas"></div>

                <div id="mensagem"></div>
            </form>

        </>
    );
}
