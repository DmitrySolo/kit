.<%= elementName %> {

  -webkit-animation: <%= elementName %> 1.0s infinite ease-in-out;
  animation: anim-<%= elementName %> 1.0s infinite ease-in-out;
}

@-webkit-keyframes anim-<%= elementName %> {
  0% { -webkit-transform: scale(0) }
  100% {
  -webkit-transform: scale(1.0);
  opacity: .4;
    }
}

@keyframes anim-<%= elementName %> {
  0% {
  -webkit-transform: scale(0);
  transform: scale(0);
} 100% {
  -webkit-transform: scale(1.0);
  transform: scale(1.0);
  opacity: 0;
  }
}