import scipy as sp
import networkx as nx
Graph = nx.Graph([(1,2), (1,3),(1,4),(2,1),(2,3),(3,1),(3,2),(4,1)])
Graph = nx.adjacency_matrix(Graph)
print(Graph.todense())
nx.draw(Graph,with_labels = True)