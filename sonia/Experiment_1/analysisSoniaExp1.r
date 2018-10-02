##### analysis script to check Sonias Exp1 pilot data
require(RBasicFunctions)
dat <- read.csv("exp1-trials.csv")

dat$rt <- (dat$decision_time+dat$read_time_two)/1000
dat$pp <- factor(dat$workerid)
dat$resp <- dat$response=="\"True\"" ### was the response "True" or "False"?
dat$split <- factor(with(dat, ifelse(quant%in%levels(quant)[c(1,4,5,6)],1,0))) # more or less than 50%?
dat$cor <- with(dat, ifelse(split==1&percent>50, T, ifelse(split==0&percent<50, T, F))) # the correct response
dat$acc <- with(dat, resp==cor) # was participant correct?
dat$larger <- with(dat,ifelse(resp==T&percent>50, T, ifelse(resp==F&percent<50, T, F))) # did pp choose the more than 50% option?
dat$trial <- 1:274

#### check decision times:
par(mfrow=c(1,4), las=1)
with(dat, plot(rt, col=pp))
with(dat, plot(rt, col=acc+1))

mean(dat$rt>5) # exclude everything slower than 5 s
mean(dat$rt<.1)
with(dat, tapply(rt<.25, pp, mean))
dat <- dat[dat$rt<5&dat$rt>.25, ]
dat <- dat[!dat$pp%in%6:7,] # exclude these that did not do the task
dat <- droplevels(dat[!dat$quant%in%levels(dat$quant)[c(1,7,8)],])# exlcude parc trials
dat <- dat[dat$trial>50, ] # exclude the first 50 trials

dat$rtz <- with(dat, make.z(rt, pp))

par(mfrow=c(2,2), las=1)
with(dat, plot(rt, col=pp))
barplot(with(dat, tapply(resp, pp, mean))); abline(h=.5)
barplot(with(dat, tapply(acc, pp, mean))); abline(h=.5)
barplot(with(dat, tapply(larger, quant, mean))); abline(h=.5)

par(mfrow=c(2,3))
for (q in levels(dat$quant)) {
	with(dat[dat$quant==q,], plot(percent, rtz, ylim=c(-3,3)))
	lm1 <- lm(rtz ~ percent, data=dat[dat$quant==q,])
	print(summary(lm1))
	abline(lm1, col="red", lwd=2)
}

barplot(with(dat, tapply(rt, list(larger,quant), mean)), beside=T);

par(mfrow=c(2,4))
for (id in levels(dat$pp)) {
	with(dat[dat$pp==id,], plot(rtz))
}