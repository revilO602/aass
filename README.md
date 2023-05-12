# AASS projekt - Systém pre rezerváciu tréningov

## Obsah
V priečinku _apps/_ sa nachádzajú rôzne verzie frontendu aj backendu:

* _camunda_: verzia s použitím camundy a BPM
* _frontend-kafka_: frontend pre mikroslužby, ktoré komunikujú kafkou
* _frontend-monolit_: frontend pre prvú, monolitickú verziu aplikácie
* _kafka-microservices_: verzia backendu s mikroslužbami a kafka eventami
* _monolit_: verzia backendu s monolitickou štruktúrou

## Návod na spustenie

Príkaz na nainštalovanie balíčkov: ``npm install``

Príkaz na spustenie všetkých verzií aplikácie: ``npm run dev``

Frontend pre monolitickú verziu sa spustí na adrese http://127.0.0.1:5173

Frontend pre verziu s mikroslužbami a kafkou sa spustí na adrese http://127.0.0.1:5174

Pre používanie camundy je potrebne ju spustiť a deploynúť priložený camunda diagram aj s formulármi.

Pre použitie kafky je treba spustiť Kafka server a aspoň jedného kafka brokera na default porte.

