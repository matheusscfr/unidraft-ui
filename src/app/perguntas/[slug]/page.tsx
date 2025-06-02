"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import getOneQuestion from "@/actions/getOneQuestion";
import markAnswer from "@/actions/markAnswer";
import { toast } from "sonner";

export default function PerguntaPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<string | null>(null);
  const [pergunta, setPergunta] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [respostaEnviada, setRespostaEnviada] = useState(false);
  const [respostaCorreta, setRespostaCorreta] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchPergunta = async () => {
      const { data, ok, error } = await getOneQuestion(params.slug);
      if (ok && data) {
        setPergunta(data);
      }
      setLoading(false);
    };

    fetchPergunta();
  }, [params.slug]);

  const handleEnviarResposta = async () => {
    if (!opcaoSelecionada) {
      toast.error("Selecione uma opção antes de enviar");
      return;
    }

    const opcaoSelecionadaObj = pergunta.opcoes.find((op: any) => op.id_opcao_resposta === opcaoSelecionada);
    setRespostaCorreta(opcaoSelecionadaObj.correta);
    setRespostaEnviada(true);

    const { ok, error } = await markAnswer({
      id_pergunta: pergunta.id_pergunta,
      id_opcao_resposta: opcaoSelecionada
    });

    if (!ok) {
      toast.error("Erro ao enviar resposta");
    }
  };

  const getButtonVariant = (opcao: any) => {
    if (!respostaEnviada) {
      return opcaoSelecionada === opcao.id_opcao_resposta ? "default" : "outline";
    }

    if (opcao.correta) {
      return "default";
    }

    if (opcaoSelecionada === opcao.id_opcao_resposta && !opcao.correta) {
      return "destructive";
    }

    return "outline";
  };

  const getButtonClassName = (opcao: any) => {
    const baseClass = "justify-start text-xl py-6";
    if (respostaEnviada && opcao.correta) {
      return `${baseClass} bg-green-600 hover:bg-green-700`;
    }
    return baseClass;
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (!pergunta) {
    return <div className="min-h-screen flex items-center justify-center">Pergunta não encontrada</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-background p-8">
      <div className="w-full max-w-3xl relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-0 scale-200"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-8 h-8" />
        </Button>
        <Card className="mt-20 shadow-2xl">
          <CardContent className="flex flex-col gap-10 py-14 px-12">
            <span className="text-3xl font-bold text-primary mb-4 text-center">{pergunta.enunciado}</span>
            <div className="flex flex-col gap-6">
              {pergunta.opcoes.map((opcao: any) => (
                <Button
                  key={opcao.id_opcao_resposta}
                  variant={getButtonVariant(opcao)}
                  className={getButtonClassName(opcao)}
                  onClick={() => !respostaEnviada && setOpcaoSelecionada(opcao.id_opcao_resposta)}
                  disabled={respostaEnviada}
                >
                  {opcao.texto_resposta}
                </Button>
              ))}
            </div>
            {respostaEnviada && (
              <div className={`text-center text-xl font-bold ${respostaCorreta ? 'text-green-600' : 'text-red-600'}`}>
                {respostaCorreta ? 'Resposta correta!' : 'Resposta incorreta!'}
              </div>
            )}
            <div className="flex gap-6 justify-end mt-10">
              {!respostaEnviada && (
                <Button 
                  variant="secondary" 
                  className="text-lg px-8 py-4"
                  onClick={handleEnviarResposta}
                >
                  Enviar resposta
                </Button>
              )}
              <Button 
                variant="default" 
                className="text-lg px-8 py-4"
                onClick={() => router.push(`/perguntas/${params.slug}`)}
              >
                Próxima pergunta
              </Button>
            </div>
            <Button
              variant="outline"
              className="mt-8 text-lg px-8 py-4 mx-auto"
              onClick={() => router.push("/ranking")}
            >
              Veja o seu ranking
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 