import random
import time
import os

# ============================================================
# BRIAN: A MANSÃO DE BLACKWOOD
# RPG de terror em texto - 5 capítulos / 2 finais
# ============================================================

def limpar():
    os.system("cls" if os.name == "nt" else "clear")

def pausa(segundos=0.8):
    time.sleep(segundos)

def falar(nome, texto):
    print(f"\n{nome}: \"{texto}\"")
    pausa(0.7)

def narrar(texto):
    print(f"\n{texto}")
    pausa(0.8)

def titulo(texto):
    print("\n" + "=" * 68)
    print(texto.center(68))
    print("=" * 68)

def escolher(pergunta, opcoes):
    while True:
        print(f"\n{pergunta}")
        for i, opcao in enumerate(opcoes, 1):
            print(f"  [{i}] {opcao}")
        resposta = input("\n> ").strip()
        if resposta.isdigit() and 1 <= int(resposta) <= len(opcoes):
            return int(resposta)
        print("Escolha inválida. Digite o número de uma opção.")

def status(jogador):
    print("\n" + "-" * 68)
    print(f"❤️ Vida: {jogador['vida']}/100   🔦 Sanidade: {jogador['sanidade']}/100")
    print(f"🔑 Chaves: {len(jogador['chaves'])}/3   🎒 Inventário: {', '.join(jogador['inventario']) or 'vazio'}")
    print("-" * 68)

def dano_monstro(jogador, minimo=8, maximo=18):
    dano = random.randint(minimo, maximo)
    jogador["vida"] -= dano
    jogador["sanidade"] = max(0, jogador["sanidade"] - random.randint(3, 9))
    narrar(f"O monstro ataca! Brian sofre {dano} de dano.")
    if jogador["vida"] <= 0:
        jogador["vida"] = 0
        return True
    return False

def recuperar(jogador, vida=0, sanidade=0):
    jogador["vida"] = min(100, jogador["vida"] + vida)
    jogador["sanidade"] = min(100, jogador["sanidade"] + sanidade)

def usar_arma(jogador):
    armas = [item for item in jogador["inventario"] if item in ["Revólver", "Espingarda", "Machado"]]
    if not armas:
        return False

    print("\nArmas disponíveis:")
    for i, arma in enumerate(armas, 1):
        print(f"[{i}] {arma}")
    escolha = input("> ").strip()

    if not escolha.isdigit() or not 1 <= int(escolha) <= len(armas):
        return False

    arma = armas[int(escolha) - 1]

    if arma == "Revólver":
        if jogador["municao"] <= 0:
            narrar("O revólver está sem munição.")
            return False
        jogador["municao"] -= 1
        dano = random.randint(18, 30)
    elif arma == "Espingarda":
        if jogador["municao_espingarda"] <= 0:
            narrar("A espingarda está sem munição.")
            return False
        jogador["municao_espingarda"] -= 1
        dano = random.randint(30, 45)
    else:
        dano = random.randint(12, 22)

    jogador["monstro_ferido"] += dano
    narrar(f"Brian usa {arma} e causa {dano} de dano no monstro.")
    return True

def encontro_monstro(jogador, intensidade=1):
    narrar("Um ruído pesado ecoa pelo corredor...")
    narrar("Passos. Lentos. Depois, rápidos.")
    narrar("O MONSTRO surge no fim do corredor.")

    while True:
        if jogador["vida"] <= 0:
            return False

        op = escolher("O que Brian faz?", [
            "Atacar",
            "Correr e tentar despistar",
            "Esconder-se",
            "Usar um item de cura"
        ])

        if op == 1:
            if usar_arma(jogador):
                if jogador["monstro_ferido"] >= 55:
                    narrar("O monstro recua, ferido. Brian ganha alguns segundos.")
                    return True
                if dano_monstro(jogador, 8 * intensidade, 15 * intensidade):
                    return False

        elif op == 2:
            chance = random.randint(1, 100)
            if chance <= 55 - (intensidade * 5):
                narrar("Brian corre por um corredor lateral e bate uma porta atrás de si.")
                recuperar(jogador, sanidade=5)
                return True
            narrar("O monstro é mais rápido do que parece.")
            if dano_monstro(jogador, 7 * intensidade, 14 * intensidade):
                return False

        elif op == 3:
            chance = random.randint(1, 100)
            if chance <= 65 - intensidade * 5:
                narrar("Brian apaga a lanterna e se enfia atrás de um armário.")
                narrar("A criatura passa a poucos centímetros dele...")
                recuperar(jogador, sanidade=4)
                return True
            narrar("Uma respiração monstruosa para exatamente atrás de Brian.")
            if dano_monstro(jogador, 9 * intensidade, 16 * intensidade):
                return False

        else:
            if "Kit médico" in jogador["inventario"]:
                jogador["inventario"].remove("Kit médico")
                recuperar(jogador, vida=30)
                narrar("Brian usa o kit médico e recupera 30 de vida.")
            else:
                narrar("Brian não possui nenhum item de cura.")

def ler_livro(jogador, titulo_livro, texto):
    narrar(f"📖 Brian encontra o livro: {titulo_livro}")
    print("\n" + texto)
    input("\nPressione ENTER para continuar...")
    jogador["livros"].append(titulo_livro)

def morte():
    titulo("FIM DE JOGO")
    print("""
Brian caiu.

A mansão ficou em silêncio novamente.

Algumas horas depois, os jornais noticiaram apenas que o herdeiro
da propriedade havia desaparecido.

Mas, no porão...

uma luz vermelha continuava piscando.
""")
    print("\nObrigado por jogar: BRIAN - A MANSÃO DE BLACKWOOD")
    input("\nPressione ENTER para sair...")

def final_fuga(jogador):
    limpar()
    titulo("FINAL 1 - A FUGA")
    narrar("Brian encaixa a terceira chave na porta principal.")
    narrar("O mecanismo antigo range. A porta finalmente se abre.")
    narrar("Atrás dele, o monstro atravessa o corredor.")
    falar("Brian", "Eu não vou morrer aqui!")
    narrar("Brian corre para fora da mansão.")
    narrar("A porta bate violentamente atrás dele.")
    narrar("Ele olha para a janela do segundo andar.")
    narrar("Por um instante, vê a silhueta da criatura observando.")
    narrar("Então a mansão fica completamente escura.")
    narrar("Brian sobreviveu. Mas nunca descobriu quantas outras criaturas o tio havia escondido.")
    print("\n🏁 FINAL: SOBREVIVENTE")
    input("\nPressione ENTER para sair...")

def final_vacina(jogador):
    limpar()
    titulo("FINAL 2 - O ANTÍDOTO")
    narrar("Brian coloca a injeção no braço da criatura.")
    narrar("Por alguns segundos, nada acontece.")
    narrar("Então o monstro começa a tremer.")
    narrar("Os músculos relaxam. A respiração diminui.")
    narrar("A criatura cai de joelhos.")
    falar("Brian", "Meu Deus... você era humano.")
    narrar("Entre os documentos do tio, Brian encontra uma última anotação.")
    print("""
"Se alguém conseguir neutralizá-lo, não destrua a criatura.
Ela não nasceu assim. Eu fiz isso com ela."
""")
    narrar("Brian destrói os equipamentos do laboratório e chama as autoridades.")
    narrar("A verdade sobre o tio finalmente vem à tona.")
    narrar("Mas, enquanto Brian deixa a mansão...")
    narrar("um dos monitores quebrados volta a acender.")
    print("\n🏁 FINAL: A VERDADE")
    input("\nPressione ENTER para sair...")

def capitulo_1(jogador):
    limpar()
    titulo("CAPÍTULO 1 - A HERANÇA")
    narrar("Uma chuva pesada cai sobre Blackwood.")
    narrar("Brian estaciona diante da mansão que herdou de seu tio, Arthur Blackwood.")
    narrar("O homem morreu há duas semanas.")
    narrar("Brian nunca gostou dele.")
    falar("Brian", "Meu tio sempre dizia que eu nunca deveria entrar no porão...")
    narrar("A chave gira na fechadura.")
    narrar("A porta se abre sozinha.")

    op = escolher("O hall da mansão está escuro. Brian pode:", [
        "Acender a luz e explorar o hall",
        "Ir direto para o escritório do tio",
        "Investigar um barulho vindo da cozinha"
    ])

    if op == 1:
        narrar("A luz pisca três vezes.")
        narrar("Em uma parede, Brian encontra uma fotografia antiga da família.")
        narrar("O rosto do tio foi riscado com tinta preta.")
        jogador["sanidade"] -= 5
    elif op == 2:
        narrar("Brian encontra o escritório trancado.")
        narrar("Uma placa diz: 'Somente Arthur'.")
        jogador["inventario"].append("Chave do escritório")
    else:
        narrar("Na cozinha, uma panela cai sozinha.")
        narrar("Não há ninguém.")
        narrar("Brian encontra um revólver antigo dentro de uma gaveta.")
        jogador["inventario"].append("Revólver")
        jogador["municao"] = 2

    ler_livro(jogador, "Diário de Arthur - Entrada 01", """
"13 de outubro.

O espécime continua vivo.

A criatura não é uma doença.
É uma adaptação.

Ela aprende.
Ela observa.
E, principalmente, ela reconhece quem tem medo."
""")

    narrar("Brian sente um arrepio.")
    falar("Brian", "Espécime? Que diabos você estava fazendo, tio?")

    jogador["chaves"].append("Chave da entrada")
    narrar("No fim do capítulo, Brian encontra uma pequena chave com a etiqueta 'ALA OESTE'.")

def capitulo_2(jogador):
    limpar()
    titulo("CAPÍTULO 2 - A ALA OESTE")
    narrar("A chuva aumenta.")
    narrar("Brian atravessa um corredor coberto por retratos antigos.")
    narrar("Um deles parece ter sido arrancado recentemente.")

    op = escolher("Há três caminhos:", [
        "Biblioteca",
        "Quarto do tio",
        "Sala de segurança"
    ])

    if op == 1:
        ler_livro(jogador, "Caderno de Anatomia", """
"Os ossos da criatura suportam impactos absurdos.
Armas comuns podem apenas retardá-la.

A fraqueza real está no sistema nervoso.
A fórmula N-17 pode neutralizar o organismo.
Porém, a fórmula precisa ser injetada diretamente."
""")
        narrar("Brian percebe que uma página foi arrancada.")
        jogador["sanidade"] -= 3

    elif op == 2:
        narrar("O quarto de Arthur está impecável.")
        narrar("Na mesa existe uma carta nunca enviada.")
        print("""
"Brian,

se você está lendo isso, significa que falhei.

Não confie nas gravações.
Não abra a porta de ferro.
E jamais deixe o espécime chegar ao andar superior."
""")
        jogador["inventario"].append("Carta de Arthur")

    else:
        narrar("Monitores mostram diferentes cômodos da mansão.")
        narrar("Um dos monitores mostra uma cela subterrânea.")
        narrar("A cela está vazia.")
        narrar("Brian percebe algo pior: a porta da cela está aberta.")

    narrar("Um estrondo vem do corredor.")
    narrar("Algo bate contra a parede.")
    narrar("Brian corre.")

    if "Revólver" not in jogador["inventario"]:
        jogador["inventario"].append("Revólver")
        jogador["municao"] = 2
        narrar("Brian encontra um revólver dentro de uma caixa de emergência.")

    if not encontro_monstro(jogador, 1):
        return False

    jogador["chaves"].append("Chave da ala oeste")
    narrar("Brian encontra uma chave caída no chão.")
    narrar("A etiqueta diz: 'SUBSOLO'.")
    return True

def capitulo_3(jogador):
    limpar()
    titulo("CAPÍTULO 3 - O LABORATÓRIO")
    narrar("Brian desce as escadas.")
    narrar("A temperatura cai.")
    narrar("As paredes deixam de parecer parte de uma mansão.")
    narrar("Agora parecem um laboratório.")

    op = escolher("No laboratório, Brian encontra:", [
        "Computador do tio",
        "Armário de armas",
        "Sala de arquivos"
    ])

    if op == 1:
        narrar("O computador pede uma senha.")
        senha = escolher("Uma anotação apresenta três possibilidades:", [
            "BLACKWOOD",
            "N-17",
            "ELENA"
        ])
        if senha == 2:
            narrar("Senha correta.")
            narrar("Brian acessa os arquivos.")
            print("""
PROJETO N-17
STATUS: INSTÁVEL

O espécime reage violentamente a sons agudos.
O composto N-17 pode reverter a mutação.

Local do antídoto:
Câmara criogênica B-4.

Acesso:
3 símbolos + chave mestre.
""")
            jogador["vacina_pista"] = True
        else:
            narrar("Senha incorreta.")
            narrar("O computador começa a emitir um alarme.")
            jogador["sanidade"] -= 10

    elif op == 2:
        narrar("O armário está enferrujado.")
        if random.randint(1, 100) <= 75:
            jogador["inventario"].append("Espingarda")
            jogador["municao_espingarda"] = 2
            narrar("Brian encontra uma espingarda.")
        else:
            narrar("Está vazio. Só existe uma mancha escura no fundo.")

    else:
        ler_livro(jogador, "Relatório N-17", """
O espécime era um voluntário humano.

O processo de regeneração funcionou.
Mas também aumentou força, percepção e agressividade.

Arthur acreditava que poderia controlar a criatura.

Ele estava errado.

O único método seguro é o composto N-17.
""")

    narrar("Uma sirene começa a tocar.")
    narrar("As portas automáticas se fecham.")
    narrar("Brian percebe que o monstro está dentro do laboratório.")

    if not encontro_monstro(jogador, 2):
        return False

    narrar("Depois do confronto, Brian encontra uma chave dourada.")
    jogador["chaves"].append("Chave dourada")

    if "Kit médico" not in jogador["inventario"]:
        jogador["inventario"].append("Kit médico")

    return True

def capitulo_4(jogador):
    limpar()
    titulo("CAPÍTULO 4 - A CÂMARA B-4")
    narrar("O quarto capítulo é onde a mansão revela seu coração podre.")
    narrar("Brian encontra uma enorme porta metálica.")
    narrar("Há três símbolos: ☽  ♢  ☠")

    op = escolher("Para abrir a porta:", [
        "Seguir as anotações do tio",
        "Forçar a porta",
        "Procurar outra entrada"
    ])

    if op == 1:
        if "Relatório N-17" in jogador["livros"] or jogador["vacina_pista"]:
            narrar("Brian posiciona os símbolos na sequência encontrada nos documentos.")
            narrar("A porta se abre.")
        else:
            narrar("Brian não sabe a sequência.")
            narrar("Ele precisa investigar mais.")
            jogador["sanidade"] -= 8
    elif op == 2:
        narrar("Brian força a porta.")
        narrar("Um alarme dispara.")
        jogador["vida"] -= 15
        jogador["sanidade"] -= 10
    else:
        narrar("Brian encontra um duto de manutenção.")
        narrar("Ele rasteja pelo interior da parede.")
        narrar("Do outro lado existe uma sala escondida.")

    narrar("Dentro da câmara, existem três recipientes.")
    narrar("Dois estão vazios.")
    narrar("O terceiro contém uma seringa azul.")

    # A opção da vacina é propositalmente mais difícil.
    if jogador["vacina_pista"] and len(jogador["livros"]) >= 2:
        op2 = escolher("Brian encontrou o possível N-17. O que fazer?", [
            "Pegar a injeção",
            "Deixar a injeção e procurar a saída"
        ])
        if op2 == 1:
            jogador["inventario"].append("Injeção N-17")
            narrar("Brian guarda cuidadosamente a injeção.")
            narrar("Ele ouve um rugido vindo do outro lado da porta.")
    else:
        narrar("A câmara está trancada por um mecanismo secundário.")
        narrar("Brian não conseguiu descobrir como liberar o N-17.")
        narrar("A rota da vacina parece perdida.")

    narrar("O monstro surge novamente.")
    if not encontro_monstro(jogador, 2):
        return False

    return True

def capitulo_5(jogador):
    limpar()
    titulo("CAPÍTULO 5 - A ÚLTIMA PORTA")
    narrar("A mansão inteira treme.")
    narrar("Brian corre até o hall principal.")
    narrar("A porta de saída possui três fechaduras.")

    if "Injeção N-17" in jogador["inventario"]:
        op = escolher("Brian possui o N-17. Qual será sua decisão?", [
            "Tentar neutralizar o monstro",
            "Usar as três chaves e fugir"
        ])

        if op == 1:
            narrar("Brian espera o monstro aparecer.")
            narrar("Ele segura a seringa com mãos trêmulas.")
            narrar("A criatura avança.")
            chance = random.randint(1, 100)
            if chance <= 75:
                final_vacina(jogador)
            else:
                narrar("Brian erra a injeção.")
                narrar("A criatura o derruba.")
                narrar("A seringa cai no chão.")
                if "Espingarda" in jogador["inventario"] and jogador["municao_espingarda"] > 0:
                    narrar("No último segundo, Brian usa a espingarda para ganhar distância.")
                    jogador["municao_espingarda"] -= 1
                    final_vacina(jogador)
                else:
                    morte()
        else:
            if len(jogador["chaves"]) >= 3:
                final_fuga(jogador)
            else:
                narrar("Ainda faltam chaves para abrir a porta.")
                if not encontro_monstro(jogador, 2):
                    morte()
                else:
                    final_fuga(jogador)

    elif len(jogador["chaves"]) >= 3:
        op = escolher("Brian possui as três chaves. O monstro está se aproximando.", [
            "Abrir a porta e fugir",
            "Voltar para procurar uma arma"
        ])
        if op == 1:
            final_fuga(jogador)
        else:
            if not encontro_monstro(jogador, 3):
                morte()
            else:
                final_fuga(jogador)
    else:
        narrar("Brian não possui todas as chaves.")
        narrar("A única chance é encontrar uma saída alternativa.")
        op = escolher("Há uma passagem atrás da lareira.", [
            "Entrar na passagem",
            "Enfrentar o monstro e procurar as chaves restantes"
        ])
        if op == 1:
            narrar("A passagem leva até uma janela.")
            narrar("Brian quebra o vidro e salta para fora.")
            narrar("Ele sobrevive, mas nunca descobre a verdade.")
            final_fuga(jogador)
        else:
            if not encontro_monstro(jogador, 3):
                morte()
            else:
                final_fuga(jogador)

def jogo():
    jogador = {
        "vida": 100,
        "sanidade": 100,
        "inventario": [],
        "chaves": [],
        "livros": [],
        "municao": 0,
        "municao_espingarda": 0,
        "monstro_ferido": 0,
        "vacina_pista": False
    }

    limpar()
    titulo("BRIAN: A MANSÃO DE BLACKWOOD")
    print("""
                 UM RPG DE TERROR EM TEXTO

             "Algumas heranças vêm com segredos.
              Esta veio com uma criatura."

Controles:
- Escolha as opções digitando o número.
- Explore os cômodos.
- Leia os livros e documentos.
- Colete as chaves.
- Encontre armas e munição.
- A rota do N-17 é mais difícil.
- Existem DOIS finais principais.
""")
    input("Pressione ENTER para começar...")

    capitulo_1(jogador)
    status(jogador)

    if not capitulo_2(jogador):
        morte()
        return
    status(jogador)

    if not capitulo_3(jogador):
        morte()
        return
    status(jogador)

    if not capitulo_4(jogador):
        morte()
        return
    status(jogador)

    capitulo_5(jogador)

if __name__ == "__main__":
    try:
        jogo()
    except KeyboardInterrupt:
        print("\n\nJogo encerrado.")
