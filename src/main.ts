import { DataSourceOptions, DataSource, EventSubscriber, InsertEvent, EntitySubscriberInterface } from "typeorm"
import { User } from "./entity/user"
import { Message } from "./entity/message"
import { Link } from "./entity/link"
import { validateOrReject } from "class-validator"

@EventSubscriber()
class Subscriber implements EntitySubscriberInterface {  
  listenTo() {
    return Link
  }

  beforeInsert(event: InsertEvent<Link>) {
    return validateOrReject(event.entity)
  }
}

class Service {
  async example() {
    const options: DataSourceOptions = {
      type: "sqlite",
      database: ":memory:",
      entities: [ User, Message, Link ],
      synchronize: true,
      logging: true,
      subscribers: [ Subscriber ],
      migrations: [],
    }

    const dataSource = new DataSource(options)
    await dataSource.initialize()
  
    const userRepo = dataSource.getRepository(User)
    const messageRepo = dataSource.getRepository(Message)

    let user: User = await userRepo.save({ name: "joe" })
    console.log(user)

    const link1 = new Link()
    link1.url = 'https://google'
    const link2 = new Link()
    link2.url = 'https://bing.com'

    // should throw error
    const message1 = await messageRepo.save({ 
      sender: user, 
      text: "Hello",
      links: [link1, link2]
    })
  }
}

const service = new Service()
service.example()
  .catch(console.error)