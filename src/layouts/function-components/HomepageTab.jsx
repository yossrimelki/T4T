import { useState } from "react";
import * as Icon from "react-feather";
import { humanize } from "@/lib/utils/textConverter";
import { markdownify } from "@/lib/utils/textConverter";

const HomepageTab = ({ homepage_tab: { tab_list, title, description } }) => {
  const [tab, setTab] = useState(0);

  return (
    <div className="tab gx-5 row items-center">
      <div className="lg:col-7 lg:order-2">
        <div className="tab-content">
          {tab_list.map((item, index) => (
            <div key={index} className={`tab-content-panel ${tab === index ? "active" : ""}`}>
              <img className="w-full object-contain"  src={item.image} alt={item.title} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 lg:col-5 lg:order-1 lg:mt-0">
        <div className="text-container">
          <h2 className="lg:text-4xl" data-translate="service.homepage_tab.title">{markdownify(title)}</h2>
          <p className="mt-4" data-translate="service.homepage_tab.description">{description}</p>
          <ul className="tab-nav mt-8 border-b-0">
            {tab_list.map((item, index) => {
              const FeatherIcon = Icon[humanize(item.icon)];
              return (
                <li
                  key={index}
                  className={`tab-nav-item ${tab === index ? "active" : ""}`}
                  onClick={() => setTab(index)}
                >
                  <span className="tab-icon mr-3">
                    <FeatherIcon />
                  </span><a data-translate={item.title} >
                  {item.title}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomepageTab;
